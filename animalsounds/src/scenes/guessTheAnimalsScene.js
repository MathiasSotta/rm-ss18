import 'phaser';
import { GameMenuScene } from './gameMenuScene';
import { Animal } from "../objects/Animal";
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from "../index";

export class GuessTheAnimalsScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GuessTheAnimalsScene'
        });
    }
  preload() {

  }

  create() {

    console.log('GuessTheAnimalsScene started');
    this.add.text(gameConfig.width/2, 100, 'GuessTheAnimalsScene', { fill: '#df0' }).setOrigin(.5);

    let animals = new AnimalController(this);
    // console.log("Animal1: " + JSON.stringify(animalArri[0].getScale()));


    this.input.once('pointerdown', function (event) {
    this.scene.start('GameMenuScene');
    this.scene.bringToTop();
    this.scene.stop('GuessTheAnimalsScene');
    console.log('From GuessTheAnimalsScene back to simple');
    }, this);

  }
}
