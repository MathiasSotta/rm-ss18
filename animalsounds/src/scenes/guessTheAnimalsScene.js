import 'phaser';
import {GameMenuScene} from './gameMenuScene';
import {Animal} from "../objects/Animal";
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from "../index";
import * as Phaser from "phaser";

export class GuessTheAnimalsScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GuessTheAnimalsScene'
        });

    }

    preload() {


    }

    create() {

        console.log('GuessTheAnimalsScene started');

        // let the dogs out
        let animals = new AnimalController({scene: this});

        // ToDo: Remove Helper texts
        this.add.text(gameConfig.width / 2, 100, 'GuessTheAnimalsScene', {fill: '#df0'}).setOrigin(.5);

        // init score vars
        let score = 0;
        let scoreText = this.add.text(gameConfig.width * .9, gameConfig.height * .9, 'Score: 0', {fill: '#df0'}).setOrigin(.5);

        // load sounds
        let sound = this.sound.addAudioSprite('sfx');

        // random pick an animal to hear its sound
        let pickAnAnimal = animals.randomPickAnimal();

        // create playbutton & make it interactive
        let playButton = this.add.graphics();
        const color = 0xff4400;
        const alpha = 1;

        playButton.fillStyle(0xffffff, alpha);

        const a = new Phaser.Geom.Point(400, 400);
        const b = new Phaser.Geom.Point(400, 430);
        const c = new Phaser.Geom.Point(425, 415);

        playButton.fillCircle(a.x + 10, a.y + 15, 30);
        playButton.fillStyle(color, alpha);
        playButton.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);

        playButton.setInteractive(new Phaser.Geom.Circle(a.x + 10, a.y + 15, 30), Phaser.Geom.Circle.Contains);

        playButton.on('pointerover', function () {
            console.log("playbtn hovered");
            playButton.clear();
            playButton.fillStyle(0xffff00, 1);
            playButton.fillCircle(a.x + 10, a.y + 15, 30);
            playButton.fillStyle(color, alpha);
            playButton.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);
        });

        playButton.on('pointerout', function () {
            playButton.clear();
            playButton.fillStyle(0xffffff, alpha);
            playButton.fillCircle(a.x + 10, a.y + 15, 30);
            playButton.fillStyle(color, alpha);
            playButton.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);
        });

        console.log(this.children);

        playButton.on('pointerdown', function () {

            if (sound.isPlaying) {
                sound.stop();
            }
            console.log("Looking for: " + pickAnAnimal);
            sound.play(pickAnAnimal);

            //console.log(this.scene.children.list);

            // now make animals interactive
            for (let animalSprites of this.scene.children.list) {

                if (animalSprites.type === "Sprite" && animalSprites.class === "animal") {

                    animalSprites.on('pointerdown', function () {

                        console.log(animalSprites.name + " clicked");

                        if (sound.isPlaying) {
                            sound.stop();
                        }

                        // winner takes it all
                        if (pickAnAnimal === animalSprites.name) {
                            sound.play('success');

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
                        else sound.play('wrong');

                    });
                }

            }

        });

    }


}



