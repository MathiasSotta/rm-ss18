import 'phaser';
import {GameMenuScene} from './gameMenuScene';
import {HearTheAnimalScene} from './hearTheAnimalsScene';
import {Animal} from "../objects/Animal";
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from "../index";
import * as Phaser from "phaser";

export class GuessTheAnimalsScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'GuessTheAnimalsScene'
        });
    }

    preload() {
        this.load.audioSprite('sfx', 'assets/audio/animalsounds.json', [
            'assets/audio/animalsounds.ogg',
            'assets/audio/animalsounds.mp3'
        ], {
            instances: 4
        });
        this.load.audio('music', 'assets/audio/background_music.mp3');

    }

    create() {
        let theScene = this;
        console.log('GuessTheAnimalsScene started');
        console.log(this);

        // let the dogs out
        let animals = new AnimalController({scene: this});


        // ToDo: Remove Helper texts
        this.add.text(gameConfig.width / 2, 100, 'GuessTheAnimalsScene', {fill: '#df0'}).setOrigin(.5);

        // init score vars
        let score = 0;
        let scoreText = this.add.text(gameConfig.width * .9, gameConfig.height * .9, 'Score: 0', {fill: '#df0'}).setOrigin(.5);

        // set sounds
        let sfx = this.sound.addAudioSprite('sfx');
        // random pick an animal to hear its sound
        let pickAnAnimal = animals.randomPickAnimal();
        let solved = false;

        let group = this.add.group();
        let playButton = this.add.sprite(gameConfig.width / 2, gameConfig.height / 1.75, 'playbutton', 1).setScale(.4).setInteractive().setOrigin(0.5);

        playButton.on('pointerdown', function () {
            playButton.disableInteractive();
            playButton.setFrame(0);
            console.log("Looking for: " + pickAnAnimal);

            sfx.play(pickAnAnimal);

            sfx.on('ended', function () {
                playButton.setInteractive();
                playButton.setFrame(1);
                console.log(pickAnAnimal);

            });

            // make animals interactive
            for (let animalSprites of theScene.children.list) {

                if (animalSprites.type === "Sprite" && animalSprites.class === "animal") {
                    // get interactive animals
                    animalSprites.setInteractive();

                    animalSprites.on('pointerup', function () {
                        console.log(pickAnAnimal);
                        console.log(animalSprites.name + " clicked");

                        // winner
                        if (pickAnAnimal === animalSprites.name) {
                            animalSprites.disableInteractive();
                            sfx.play('success');
                            console.log("success played");
                            score += 100;
                            scoreText.setText('Score: ' + score);

                            // now remove the current (and solved) group of animals
                            animals.removeAnimalGroup();
                            // create some new animals
                            animals.makeAnimals();
                            // set a new random target
                            pickAnAnimal = animals.randomPickAnimal();
                        }
                        else {
                            // try again
                            console.log("should be false: " + (pickAnAnimal === animalSprites.name));
                            sfx.play('wrong');
                            console.log("wrong played");
                        }
                    });
                }
            }
        });



        // playButton.on('pointerover', function () {
        //     console.log("playbtn hovered");
        //     this.setFrame(2);
        // });
        //
        // playButton.on('pointerout', function () {
        //     this.setFrame(1);
        //
        // });


        //console.log(this.scene.children.list);

    }

    /*
        update(time,delta) {
            console.log(this.animals.soundIsPlaying());
        }
    */
    makeAnimalsInteractive(animals, pickAnAnimal, sfx, score, scoreText) {

        // make animals interactive
        for (let animalSprites of this.children.list) {

            if (animalSprites.type === "Sprite" && animalSprites.class === "animal") {

                animalSprites.on('pointerup', function () {
                    console.log(animalSprites.name + " clicked");

                    // winner takes it all
                    if (pickAnAnimal === animalSprites.name) {

                        sfx.play('success');

                        score += 100;
                        scoreText.setText('Score: ' + score);
                        console.log(score);

                        // now remove the current (and solved) group of animals
                        animals.removeAnimalGroup();
                        // create some new animals
                        animals.makeAnimals();
                        // set a new random target
                        pickAnAnimal = animals.randomPickAnimal();

                    }
                    // not that one
                    else
                        sfx.play('wrong');

                });
            }

        }

    }


}



