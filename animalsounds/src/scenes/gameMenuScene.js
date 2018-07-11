import * as Phaser from "phaser";
import {GuessTheAnimalsScene} from './guessTheAnimalsScene';
import {HearTheAnimalsScene} from './hearTheAnimalsScene';
import {gameConfig} from '../index.js';
import makeAnimations from '../helper/animations.js';

export class GameMenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameMenuScene'
        });

    }

    preload() {

    }

    create() {

        // ToDo: set gameButtons from global loader
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

        this.add.text(gameConfig.width / 2, gameConfig.height / 3.5, 'Animal Sounds', {
            fill: '#0f0',
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#00ff00'
        }).setOrigin(0.5);

        // create a group for Game Menu entries
        let group = this.add.group();
        group.classType = Phaser.GameObjects.Text;

        // create interactive text object for game 1
        let text1 = group.create(gameConfig.width / 2, gameConfig.height / 2, 'Hear the animal', {
            fill: '#0f0',
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#00ff00'
        }).setOrigin(0.5);
        text1.setName('text1');
        text1.setInteractive(new Phaser.Geom.Rectangle(0, 0, text1.width, text1.height), Phaser.Geom.Rectangle.Contains);
        text1.addListener('pointerup', function (event) {
            // console.log("text 1 pressed");
            this.scene.stop(this.scene.key);
            this.scene.launch('HearTheAnimalsScene');
        }, this);

        // create interactive text object for game 1
        let text2 = group.create(gameConfig.width / 2, gameConfig.height / 1.8, 'Guess the animal', {
            fill: '#0f0',
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#00ff00'
        }).setOrigin(0.5);
        text2.setName('text2');
        text2.setInteractive(new Phaser.Geom.Rectangle(0, 0, text2.width, text2.height), Phaser.Geom.Rectangle.Contains);
        text2.addListener('pointerup', function (event) {
            // console.log("text 2 pressed");
            this.scene.stop(this.scene.key);
            this.scene.launch('GuessTheAnimalsScene');
            this.scene.bringToTop();

        }, this);

        // interactive event on mouseover for Game Menu entries
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTint(0x0000ff, 0xffff00, 0xffff00, 0x0000ff);

        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.clearTint();
        });

    }

}


