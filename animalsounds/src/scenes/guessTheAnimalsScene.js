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
        //console.log('GuessTheAnimalsScene started');

        let theScene = this;
        let playButton;
        let guessThisAnimal;
        let resetPlayButton = true;
        let animalsInteractive = false;
        let hit;

        // let the dogs out
        let animals = new AnimalController({scene: this});
        let animalSprites = animals.getGroup().getChildren();
        playAnimalSpritesTween(animalSprites);

        // init background
        let bgTop = this.add.image((gameConfig.width / 2), 48, 'sceneitems', 'gamemenu_grad').setOrigin(0.5);
        let bgBottom = this.add.image((gameConfig.width / 2), gameConfig.height - 48, 'sceneitems', 'gamemenu_grad').setOrigin(0.5).setFlipY(true);

        // init score vars
        let score = 0;
        let scoreText = this.add.text(gameConfig.width * .9, gameConfig.height * .05, 'Score: 0', {fill: '#ffa21e'}).setOrigin(.5).setFontStyle('bold').setFontFamily('Verdana');

        // set sounds
        let animalSounds = this.sound.addAudioSprite('animalsounds');
        let gameSounds = this.sound.addAudioSprite('gamesounds');

        // MUSICBUTTON
        let musicButton = this.add.image(35, 30, 'sceneitems', 'musicon_off').setOrigin(.5).setInteractive().setScale(.6);
        musicButton.on('pointerup', toggleMusic, this);
        musicButton.on('pointerover', () => {
            musicButton.setFrame('musicon_over')
        });
        musicButton.on('pointerout', updateMusicButton, this);
        // update state when reentering scene
        updateMusicButton();

        function toggleMusic() {
            updateMusicButton();
            // toggle music from sound array
            for (let sound of this.sound.sounds) {

                if (sound.key === 'music') {

                    if (sound.isPaused) {
                        sound.resume();
                        musicButton.setFrame('musicon_on');
                        return;
                    }
                    else if (sound.isPlaying) {
                        sound.pause();
                        musicButton.setFrame('musicon_off');
                        return;
                    }
                    else if (!sound.isPlaying) {
                        sound.play();
                        musicButton.setFrame('musicon_on');
                        return;
                    }
                }
            }
        }

        // HOMEBUTTON
        let homeButton = this.add.image(85, 30, 'sceneitems', 'homebutton').setInteractive().setOrigin(.5).setScale(.6);
        homeButton.on('pointerup', toggleMenu, this);

        homeButton.on('pointerover', function () {
            this.setFrame('homebutton_over');
        }, homeButton);

        homeButton.on('pointerout', function () {
            this.setFrame('homebutton');
        }, homeButton);

        function toggleMenu() {
            this.scene.launch('GameMenuScene');
            this.scene.bringToTop();
            this.scene.stop(this.scene.key);
        }

        // PLAYBUTTON
        playButton = this.add.image((gameConfig.width / 2), (gameConfig.height / 1.9), 'sceneitems', 'playbutton_default').setScale(.5).setOrigin(0.5);
        playButtonTween(playButton);

        function playButtonSetInteractive() {
            playButton.setInteractive();
        }

        playButton.on('pointerover', function () {
            if (!animalSounds.isPlaying) {
                this.setFrame('playbutton_hover');
            }
        });

        playButton.on('pointerout', function () {
            if (!animalSounds.isPlaying) {
                this.setFrame('playbutton_default');
            }
        });

        playButton.on('pointerdown', playButtonActivated, playButton);
        animalSounds.on('ended', onSoundEnded, playButton);

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
            this.setFrame('playbutton_active');
            //console.log("Playbtn clicked + Looking for: " + guessThisAnimal);
            // console.log(this.scene);
            animalSounds.pause();
            animalSounds.play(guessThisAnimal);
        }

        function onSoundEnded() {
            playButton.setFrame('playbutton_default');
        }

        function makeAnimalsInteractive() {
            for (let i = 0; i < animalSprites.length; i++) {
                // get interactive animals
                animalSprites[i].setInteractive();
                animalSprites[i].on('pointerup', handleAnimalClicks, animalSprites[i]);
            }
        }

        // HANDLER & ANIMATION
        function handleAnimalClicks() {
            //console.log(this.name + " clicked");
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
                //console.log("=== success");
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
                        playButton.setFrame('playbutton_default');
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
            // console.log(animal);
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

        function updateMusicButton() {
            // toggle state for music button
            for (let sound of theScene.sound.sounds) {

                if (sound.key === 'music') {

                    if (sound.isPaused) {
                        musicButton.setFrame('musicon_off');
                        return;
                    }
                    else if (sound.isPlaying) {
                        musicButton.setFrame('musicon_on');
                        return;
                    }
                    else if (!sound.isPlaying) {
                        musicButton.setFrame('musicon_off');
                        return;
                    }
                }
            }
        }
    }

}





