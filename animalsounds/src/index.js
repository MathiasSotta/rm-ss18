import 'phaser';

import {GameMenuScene} from './scenes/gameMenuScene';
import {HearTheAnimalsScene} from './scenes/hearTheAnimalsScene';
import {GuessTheAnimalsScene} from "./scenes/guessTheAnimalsScene";

export const gameConfig = {
    width: 800,
    height: 600,
    scene: [
        GameMenuScene,
        HearTheAnimalsScene,
        GuessTheAnimalsScene,
    ]
};

new Phaser.Game(gameConfig);

