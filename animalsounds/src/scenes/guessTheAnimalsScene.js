import 'phaser';
import {HearTheAnimalScene} from './hearTheAnimalsScene';
import {GameMenuScene} from './gameMenuScene';
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from "../index";
import * as Phaser from "phaser";
import music from './gameMenuScene';

export class GuessTheAnimalsScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'GuessTheAnimalsScene'
        });
    }

    preload() {

    }

    create() {
        let theScene = this;
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

        // init score vars
        let score = 0;
        let scoreText = this.add.text(gameConfig.width * .9, gameConfig.height * .9, 'Score: 0', {fill: '#df0'}).setOrigin(.5);

        // set sounds
        let animalSounds = this.sound.addAudioSprite('animalsounds');
        let gameSounds = this.sound.addAudioSprite('gamesounds');
        // random pick an animal to hear its sound

        // MUSICBUTTON
        let musicButton = this.add.sprite(35, 30, 'musicbutton', 1).setOrigin(.5).setInteractive().setScale(.6);
        musicButton.on('pointerup', toggleMusic, this);

        function toggleMusic() {

            // toggle music from sound array
            for (let sound of this.sound.sounds) {

                if (sound.key === 'music') {

                    if (sound.isPaused) {
                        sound.resume();
                        musicButton.setFrame(1);
                        return;
                    }
                    if (sound.isPlaying) {
                        sound.pause();
                        musicButton.setFrame(0);
                        return;
                    }
                }
            }
        }

        // HOMEBUTTON
        let homeButton = this.add.sprite(85, 30, 'homebutton', 0).setOrigin(.5).setInteractive().setScale(.6);
        homeButton.on('pointerup', toggleMenu, this);

        homeButton.on('pointerover', function() {
            this.setFrame(1);
        }, homeButton);

        homeButton.on('pointerout', function() {
            this.setFrame(0);
        }, homeButton);

        function toggleMenu() {
            this.scene.launch('GameMenuScene');
            this.scene.bringToTop();
            this.scene.stop(this.scene.key);
        }


        // PLAYBUTTON
        playButton = this.add.sprite(gameConfig.width / 2, gameConfig.height / 1.75, 'playbutton', 1).setScale(.4).setOrigin(0.5);
        playButtonTween(playButton);

        function playButtonSetInteractive() {
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
        }

        function makeAnimalsInteractive() {
            for (let i = 0; i < animalSprites.length; i++) {
                console.log(i);
                // get interactive animals
                animalSprites[i].setInteractive();
                animalSprites[i].on('pointerup', handleAnimalClicks, animalSprites[i]);
            }
        }

        // HANDLER & ANIMATION
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
                playButton.disableInteractive();
                console.log("=== success");
                score += 100;
                scoreText.setText('Score: ' + score);
                gameSounds.play('success');
                playAnimalSpritesAnimation(this);
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
            let hideAnimals;
            for (let animal of animalSprites) {
                hideAnimals = theScene.tweens.add({
                    x: playButton.x,
                    y: playButton.y + 20,
                    targets: animal,
                    scaleX: 0,
                    scaleY: 0,
                    alpha: 0,
                    duration: 300,
                    ease: 'Sine.easeInOut',
                    //yoyo: true,
                    hold: 100,
                    onComplete: function () {

                        // now remove the current (and solved) group of animals
                        animals.removeAnimalGroup();
                        // create some new animals
                        animals.makeAnimals();
                        // set a new random target
                        playButton.setFrame(1);
                        playButton.setInteractive();
                        resetPlayButton = true;
                        animalsInteractive = false;
                        playAnimalSpritesTween(animalSprites);
                    }
                })
            }
            // clear previous animation
            this.destroy();
        }

        function playAnimalSpritesAnimation(animal) {
            console.log(animal);
            animal.setVisible(false);

            let config = {
                key: animal.ani,
                x: animal.x,
                y: animal.y,
                scale: .5,
                anims: animal.ani,
            };
            let animalAnimation = theScene.make.sprite(config);
            animalAnimation.on('animationcomplete', function () {
                animal.setVisible(true);
            });
            animalAnimation.on('animationcomplete', resetAnimals, this);

        }

    }


    /*
        update(time,delta) {
            console.log(this.animals.soundIsPlaying());
        }
    */


}



