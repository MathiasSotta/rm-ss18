import * as Phaser from "phaser";
import {GuessTheAnimalsScene} from './guessTheAnimalsScene';
import {HearTheAnimalsScene} from './hearTheAnimalsScene';
import {gameConfig} from '../index.js';

export class GameMenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameMenuScene',

        });

    }

    preload() {
    }

    create() {

        let theScene = this;

        // ToDo: set gameButtons from global loader
        // MUSICBUTTON
        let musicButton = this.add.image(35, 30, 'sceneitems', 'homebutton').setOrigin(.5).setInteractive().setScale(.6).setDepth(10);
        // update state when reentering scene
        updateMusicButton();
        musicButton.on('pointerup', toggleMusic, this);
        musicButton.on('pointerover', () => { musicButton.setFrame('musicon_over') });
        musicButton.on('pointerout', updateMusicButton, this);

        function toggleMusic() {
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

        // logo
        this.add.image(400, 300, 'sceneitems', 'gamemenu_logo');

        // game buttons
        let hearButton = this.add.image((gameConfig.width / 2) - 118 - 15, 325, 'sceneitems', 'gamemenu_hearbutton').setInteractive();
        let guessButton = this.add.image((gameConfig.width / 2) + 118 + 15, 325, 'sceneitems', 'gamemenu_guessbutton').setInteractive();

        // hover claims
        let hearClaim = this.add.image((gameConfig.width / 2), 430, 'sceneitems', 'gamemenu_claimhear').setInteractive().setAlpha(0);
        let guessClaim = this.add.image((gameConfig.width / 2), 430, 'sceneitems', 'gamemenu_claimguess').setInteractive().setAlpha(0);

        hearButton.on('pointerup', function () {
            this.scene.stop(this.scene.key);
            this.scene.launch('HearTheAnimalsScene');
        }, this);

        hearButton.on('pointerover', buttonHoverTween, hearButton);
        hearButton.on('pointerout', buttonOutTween, hearButton);

        guessButton.on('pointerup', function () {
            this.scene.stop(this.scene.key);
            this.scene.launch('GuessTheAnimalsScene');
        }, this);

        guessButton.on('pointerover', buttonHoverTween, guessButton);
        guessButton.on('pointerout', buttonOutTween, guessButton);

        function buttonHoverTween() {
            theScene.tweens.add({
                targets: this,
                scaleX: 1.1,
                scaleY: 1.1,
                alpha: 1,
                duration: 350,
                ease: 'Power2',
            });

            theScene.tweens.add({
                targets: (this.frame.name === 'gamemenu_hearbutton') ? hearClaim : guessClaim,
                alpha: 1,
                duration: 250,
                ease: 'Power2',
            });
        }

        function buttonOutTween() {
            theScene.tweens.add({
                targets: this,
                scaleX: 1,
                scaleY: 1,
                duration: 350,
                ease: 'Power2',
            });

            theScene.tweens.add({
                targets: (this.frame.name === 'gamemenu_hearbutton') ? hearClaim : guessClaim,
                alpha: 0,
                duration: 250,
                ease: 'Power2',
            });
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

