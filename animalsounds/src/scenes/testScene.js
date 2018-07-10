import * as Phaser from "phaser";
import {GuessTheAnimalsScene} from './guessTheAnimalsScene';
import {HearTheAnimalsScene} from './hearTheAnimalsScene';
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from '../index.js';

export class GameMenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TestScene'
        });
    }

    preload() {

        // preload assets
        this.load.image('cokecan', 'assets/cokecan.png');
        this.load.atlas('animalic', 'assets/animals.png', 'assets/animals.json');
        this.load.spritesheet('playbutton', 'assets/playbutton.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('arrow', 'assets/arrow.png', { frameWidth: 150, frameHeight: 400 });
        this.load.audioSprite('animalsounds', 'assets/audio/animalsounds.json', [
            'assets/audio/animalsounds.ogg',
            'assets/audio/animalsounds.mp3'
        ]);
        this.load.audioSprite('gamesounds', 'assets/audio/gamesounds.json', [
            'assets/audio/gamesounds.ogg',
            'assets/audio/gamesounds.mp3'
        ]);
        this.load.audio('music', 'assets/audio/background_music.mp3');
        //animations
        this.load.atlas('goos', 'assets/animation/goose.png', 'assets/animation/goose.json');

    }

    create() {


        // let animConfig = {
        //     key: 'goos',
        //     frames: theScene.anims.generateFrameNames('goos', {prefix: 'goosy_', end: end, zeroPad: 5}),
        //     repeat: 4,
        //     //onComplete: resetAnimals,
        // };
        //
        // theScene.anims.create(animConfig);
        //
        // let config = {
        //     key: 'goos',
        //     x: 100,
        //     y: 100,
        //     scale: .5,
        //     anims: 'goosy'
        // };
        // theScene.make.sprite(config);

    }


}


