import 'phaser';

import {GameMenuScene} from './scenes/gameMenuScene';
import {HearTheAnimalsScene} from './scenes/hearTheAnimalsScene';
import {GuessTheAnimalsScene} from "./scenes/guessTheAnimalsScene";

export const gameConfig = {
    width: 800,
    height: 600,
    backgroundColor: '#339933',
    scene: [
        GameMenuScene,
        HearTheAnimalsScene,
        GuessTheAnimalsScene,
    ],
    audio: {
        disableWebAudio: true
    },
    animalspriteWidth: 300,
    animalspriteHeight: 300,
};

new Phaser.Game(gameConfig);
