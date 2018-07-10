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
        let animalspritesTween;
        let playButton;
        let guessThisAnimal;
        let resetPlayButton = true;
        let animalsInteractive = false;
        let hit;

        console.log('GuessTheAnimalsScene started');
        console.log(this);

        // let the dogs out
        let animals = new AnimalController({scene: this});
        let animalSprites = animals.getGroup().getChildren();
        playAnimalSpritesTween(animalSprites);

        // ToDo: Remove Helper texts
        this.add.text(gameConfig.width / 2, 100, 'GuessTheAnimalsScene', {fill: '#df0'}).setOrigin(.5);

        // init score vars
        let score = 0;
        let scoreText = this.add.text(gameConfig.width * .9, gameConfig.height * .9, 'Score: 0', {fill: '#df0'}).setOrigin(.5);

        // set sounds
        let animalSounds = this.sound.addAudioSprite('animalsounds');
        let gameSounds = this.sound.addAudioSprite('gamesounds');
        // random pick an animal to hear its sound

        // PLAYBUTTON
        playButton = this.add.sprite(gameConfig.width / 2, gameConfig.height / 1.75, 'playbutton', 1).setScale(.4).setOrigin(0.5);
        playButtonTween(playButton);

        function playButtonSetInteractive(tween, targets) {
            playButton.setInteractive();
        }

        playButton.on('pointerover', function () {
            if (!animalSounds.isPlaying) {
                this.setFrame(2);
            }
        });

        playButton.on('pointerout', function () {
            if (!animalSounds.isPlaying) {
                this.setFrame(1);
            }
        });

        playButton.on('pointerdown', playButtonActivated, playButton);
        animalSounds.on('ended', onSoundEnded, animalSounds);

        function playButtonActivated() {
            // create a new animalsound to guess, else use the existing one
            if (resetPlayButton) {
                guessThisAnimal = animals.randomPickAnimal();
                resetPlayButton = false;
            }
            if (!animalsInteractive) {
                makeAnimalsInteractive();
                animalsInteractive = true;
            }
            this.setFrame(0);
            console.log("Playbtn clicked + Looking for: " + guessThisAnimal);
            // console.log(this.scene);
            animalSounds.pause();
            animalSounds.play(guessThisAnimal);
        }

        function onSoundEnded() {
            playButton.setFrame(1);
            //makeAnimalsInteractive();
        }

        function makeAnimalsInteractive() {
            for (let i = 0; i < animalSprites.length; i++) {
                console.log(i);
                // get interactive animals
                animalSprites[i].setInteractive();
                animalSprites[i].on('pointerup', handleAnimalClicks, animalSprites[i]);
            }
        }

        function handleAnimalClicks() {
            console.log(this.name + " clicked");
            hit = (guessThisAnimal === this.key);

            // try again
            if (!hit) {
                if (animalSounds.isPlaying) {
                    animalSounds.pause();
                }
                gameSounds.play('wrong');
            }

            // winner
            if (hit) {
                if (animalSounds.isPlaying) {
                    animalSounds.pause();
                }
                console.log("=== success");
                score += 100;
                scoreText.setText('Score: ' + score);
                gameSounds.play('success');
                // ToDo: set variable once all animations are available
                if (this.name === 'goose') {
                    playAnimalSpritesAnimation(this, 31);
                }
            }
        }

        function playButtonTween(playButton) {
            theScene.tweens.add({
                targets: playButton,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
                hold: 50,
                onComplete: playButtonSetInteractive,
            });
        }

        function playAnimalSpritesTween() {
            for (let animal of animalSprites) {
                theScene.tweens.add({
                    x: animal.destinationX,
                    y: animal.destinationY,
                    targets: animal,
                    scaleX: .5,
                    scaleY: .5,
                    alpha: 1,
                    duration: 650,
                    ease: 'Sine.easeInOut',
                    //yoyo: true,
                    hold: 100,
                })
            }
        }

        function resetAnimals() {
            // now remove the current (and solved) group of animals
            animals.removeAnimalGroup();
            // create some new animals
            animals.makeAnimals();
            // set a new random target
            playButton.setFrame(1);
            resetPlayButton = true;
            animalsInteractive = false;
            playAnimalSpritesTween(animalSprites);
        }

        function playAnimalSpritesAnimation(animal, end) {
            console.log(animal);
            let animConfig = {
                key: 'goos',
                frames: theScene.anims.generateFrameNames('goos', {prefix: 'goosy_', end: end, zeroPad: 5}),
                repeat: 4,
                //onComplete: resetAnimals,
            };

            theScene.anims.create(animConfig);

            let config = {
                key: 'goos',
                x: 100,
                y: 100,
                scale: .5,
                anims: 'goosy'
            };
            theScene.make.sprite(config);
            //theScene.add.sprite(400, 300, 'goos').setScale(4).play('goosy');
        }

        //console.log(this.scene.children.list);
    }


    /*
        update(time,delta) {
            console.log(this.animals.soundIsPlaying());
        }
    */


}



