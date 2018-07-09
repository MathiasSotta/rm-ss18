import 'phaser';
import {GameMenuScene} from './gameMenuScene';
import {gameConfig} from "../index";
import {AnimalController} from "../objects/AnimalController";

let animalSounds;
let arrowLeft;
let arrowRight;

export class HearTheAnimalsScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'HearTheAnimalsScene'
        });

    }

    preload() {
    }

    create() {

        let theScene = this;
        animalSounds = this.sound.addAudioSprite('animalsounds');

        console.log('HearTheAnimalsScene started');
        console.log(this.scene);

        // ToDo: Remove Helper texts
        this.add.text(gameConfig.width / 2, 100, this.scene.key, {fill: '#df0'}).setOrigin(.5);

        // init Animals
        let animals = new AnimalController({scene: this});
        let animalGroup = animals.getGroup();
        let animalSprites = animalGroup.getChildren();
        Phaser.Utils.Array.Shuffle(animalSprites);
        let currentAnimal = Phaser.Utils.Array.GetFirst(animalSprites);
        console.log(currentAnimal);
        currentAnimal.setVisible(true);


        // Set Arrows for animal selection
        arrowLeft = this.add.sprite((gameConfig.width / 5), gameConfig.height / 2, 'arrow', 1).setScale(.4).setInteractive().setOrigin(0.5).setFlipX(true);
        arrowRight = this.add.sprite((gameConfig.width / 5) * 4, gameConfig.height / 2, 'arrow', 1).setScale(.4).setInteractive().setOrigin(0.5);

        arrowLeft.on('pointerdown', rotateAnimals, arrowLeft);
        arrowRight.on('pointerdown', rotateAnimals, arrowRight);

        // make Animals interactive
        for(let i=0; i<animalSprites.length; i++ ){
            animalSprites[i].on('pointerup', playSound, animalSprites[i]);
        }

        animalSounds.on('ended', resetArrows, this);
        animalSounds.on('play', disableArrows, this);

        function disableArrows() {
            arrowLeft.disableInteractive();
            arrowRight.disableInteractive();
            arrowLeft.setAlpha(.5);
            arrowRight.setAlpha(.5);
        }
        function resetArrows() {
            arrowLeft.setInteractive(true).setAlpha(1);
            arrowRight.setInteractive(true).setAlpha(1);
        }

        function playSound() {
            animalSounds.pause();
            animalSounds.play(this.key);
            console.log(animalSounds.isPlaying);
        }

        function rotateAnimals() {
            console.log(this);
            animalSprites[0].setVisible(false).setInteractive(false);
            let animalRotate = this === arrowLeft ? Phaser.Utils.Array.RotateLeft(animalSprites) : Phaser.Utils.Array.RotateRight(animalSprites);
            animalSprites[animalSprites.length - 1].setVisible(false);
            animalSprites[0].setVisible(true).setInteractive(true);
            console.log(animalSprites[0].name);
        }

    }

    update(time, delta) {

    }
}
