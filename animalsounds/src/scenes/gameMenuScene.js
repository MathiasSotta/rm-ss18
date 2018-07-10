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
        this.load.atlas('goosy', 'assets/animation/goose.png', 'assets/animation/goose.json');
        this.load.atlas('ely', 'assets/animation/elephant.png', 'assets/animation/elephant.json');
        this.load.atlas('pigy', 'assets/animation/pig.png', 'assets/animation/pig.json');
        this.load.atlas('rosty', 'assets/animation/rooster.png', 'assets/animation/rooster.json');
        this.load.atlas('cowy', 'assets/animation/cow.png', 'assets/animation/cow.json');
        this.load.atlas('dogy', 'assets/animation/dog.png', 'assets/animation/dog.json');
        this.load.atlas('caty', 'assets/animation/cat.png', 'assets/animation/cat.json');

    }

    create() {
        makeAnimations(this);
        let theScene = this;
        // init game music
        // let music = this.sound.add('music');
        // music.loop = true;
        // music.play();


        this.add.text(gameConfig.width / 2, gameConfig.height / 3.5, 'Animal Sounds', {
            fill: '#0f0',
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#00ff00'
        }).setOrigin(0.5);
        //let text1 = new Text(gameConfig.width/2, gameConfig.height/3.5, 'Centered', { fill: '#0f0', fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
        //this.add.text(text1);

        this.add.image(100, 200, 'cokecan');

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
            console.log("text 1 pressed");
            this.scene.launch('HearTheAnimalsScene');
            this.scene.bringToTop();
            this.scene.stop('GameMenuScene');

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
            console.log("text 2 pressed");
            this.scene.launch('GuessTheAnimalsScene');
            this.scene.bringToTop();
            this.scene.stop('GameMenuScene');
        }, this);

        // interactive event on mouseover for Game Menu entries
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTint(0x0000ff, 0xffff00, 0xffff00, 0x0000ff);

        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.clearTint();
        });


        //console.log("Scene Key: " + this.scene.key);

    }


}


