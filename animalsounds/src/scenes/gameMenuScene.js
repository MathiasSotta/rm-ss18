import * as Phaser from "phaser";
import { GuessTheAnimalsScene } from './guessTheAnimalsScene';
import { HearTheAnimalsScene } from './hearTheAnimalsScene';
import{ gameConfig } from '../index.js';

export class GameMenuScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameMenuScene'
        });
    }

    preload() {

    // LOAD ANY ASSETS HERE
    this.load.image('cokecan', 'assets/cokecan.png');
    this.load.atlas('animaltest', 'assets/animals1.png', 'assets/animals1.json');

  }

    create() {

    this.add.text(gameConfig.width/2, gameConfig.height/3.5, 'Animal Sounds', { fill: '#0f0', fontFamily: 'Arial', fontSize: 64, color: '#00ff00' }).setOrigin(0.5);
    //let text1 = new Text(gameConfig.width/2, gameConfig.height/3.5, 'Centered', { fill: '#0f0', fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    //this.add.text(text1);

    this.add.image(100, 200, 'cokecan');

    // create a group for Game Menu entries
    var group = this.add.group();
    group.classType = Phaser.GameObjects.Text;

    // create interactive text object for game 1
    var text1 = group.create(gameConfig.width/2, gameConfig.height/2, 'Hear the animal', { fill: '#0f0', fontFamily: 'Arial', fontSize: 24, color: '#00ff00' }).setOrigin(0.5);
    text1.setName('text1');
    text1.setInteractive(new Phaser.Geom.Rectangle(0, 0, text1.width, text1.height), Phaser.Geom.Rectangle.Contains);
    text1.addListener('pointerdown', function(event){
        console.log("text 1 pressed");
        this.scene.launch('HearTheAnimalsScene');
        this.scene.bringToTop();
        this.scene.stop('GameMenuScene');
    }, this);

    // create interactive text object for game 1
    var text2 = group.create(gameConfig.width/2, gameConfig.height/1.8, 'Guess the animal', { fill: '#0f0', fontFamily: 'Arial', fontSize: 24, color: '#00ff00' }).setOrigin(0.5);
    text2.setName('text2');
    text2.setInteractive(new Phaser.Geom.Rectangle(0, 0, text2.width, text2.height), Phaser.Geom.Rectangle.Contains);
    text2.addListener('pointerdown', function(event){
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


