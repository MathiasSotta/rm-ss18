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
        playButton = this.add.sprite(gameConfig.width / 2, gameConfig.height / 1.75, 'playbutton', 1).setScale(.4).setInteractive().setOrigin(0.5);

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
            console.log(this);

            // try again
            if (!hit) {
                if (animalSounds.isPlaying) {
                    animalSounds.pause();
                }
                gameSounds.play('wrong');
                // console.log(guessThisAnimal);
                // console.log(this.key);
                // console.log(" ___ wrong ... right was: " + guessThisAnimal);
                // console.log(theScene);
                //return this;
            }

            // winner
            if (hit) {
                // theScene.input.stopPropagation();
                if (animalSounds.isPlaying) {
                    animalSounds.pause();
                }
                // playButton.off('pointerup', playButtonActivated, playButton);
                console.log("=== success");
                score += 100;
                scoreText.setText('Score: ' + score);
                gameSounds.play('success');
                // now remove the current (and solved) group of animals
                animals.removeAnimalGroup();
                // create some new animals
                animals.makeAnimals();
                // set a new random target
                playButton.setFrame(1);
                resetPlayButton = true;
                animalsInteractive = false;
            }
        }

        //console.log(this.scene.children.list);
    }

    /*
        update(time,delta) {
            console.log(this.animals.soundIsPlaying());
        }
    */


}



