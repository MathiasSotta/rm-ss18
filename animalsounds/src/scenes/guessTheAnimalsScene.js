import 'phaser';
import { GameMenuScene } from './gameMenuScene';
import { Animal } from "../objects/Animal";
import {AnimalController} from "../objects/AnimalController";
import {gameConfig} from "../index";
import * as Phaser from "phaser";

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

    // let the dogs out
    let animals = new AnimalController(this);

    // random pick an animal to hear its sound
    let pickAnAnimal = animals.randomPickAnimal();

    // create playbutton & make it interactive
    let graphics = this.add.graphics();
    var color = 0xff4400;
    var thickness = 4;
    var alpha = 1;

    graphics.fillStyle(0xffffff, alpha);

    var a = new Phaser.Geom.Point(400, 400);
    var b = new Phaser.Geom.Point(400, 430);
    var c = new Phaser.Geom.Point(425, 415);

    graphics.fillCircle(a.x+10, a.y+15, 30);
    graphics.fillStyle(color, alpha);
    graphics.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);

    graphics.setInteractive(new Phaser.Geom.Circle(a.x+10, a.y+15, 30), Phaser.Geom.Circle.Contains);

    graphics.on('pointerover', function () {
      console.log("playbtn hovered");
      graphics.clear();
      graphics.fillStyle(0xffff00, 1);
      graphics.fillCircle(a.x+10, a.y+15, 30);
      graphics.fillStyle(color, alpha);
      graphics.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);
    });

    graphics.on('pointerout', function () {
      graphics.clear();
      graphics.fillStyle(0xffffff, alpha);
      graphics.fillCircle(a.x+10, a.y+15, 30);
      graphics.fillStyle(color, alpha);
      graphics.fillTriangle(a.x, a.y, b.x, b.y, c.x, c.y);
    });

    graphics.on('pointerdown', function () {

        console.log(pickAnAnimal);

        let animalPicked = animals.getAnimalByName(pickAnAnimal);
        // console.log(animals.getAnimals());
        //console.log(animalPicked);
        this.scene.sound.playAudioSprite('sfx', pickAnAnimal);

        //console.log(this.scene.children.list);

        // now make animals interactive
        for (let animalSprites of this.scene.children.list) {

            if (animalSprites.type === "Sprite" && animalSprites.class === "animal") {

                animalSprites.on('pointerdown', function () {
                    // console.log(animalSprites);
                    console.log(animalSprites.name + " clicked");

                    // react on user input
                    // winner takes it all
                    if (pickAnAnimal === animalSprites.name) {
                        this.scene.sound.playAudioSprite('sfx', 'smb_stage_clear');
                    }
                    // not that one
                    else this.scene.sound.playAudioSprite('sfx', 'smb_mariodie');

                });
            }

        }
       // this.setAnimalsInteractive();


      // ToDo: play random animal sound & animation, fill scoreboard

    });




    // this.input.once('pointerdown', function (event) {
    //     this.scene.start('GameMenuScene');
    //     this.scene.bringToTop();
    //     this.scene.stop('GuessTheAnimalsScene');
    //     console.log('From GuessTheAnimalsScene back to simple');
    // }, this);

  }
    setAnimalsInteractive() {
        sprite.on('pointerdown', function (pointer, gameObject) {
            if (gameObject.name === pickAnAnimal) {
                console.log(gameObject.name);
            }
        })
    }

}

