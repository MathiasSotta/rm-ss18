import 'phaser';
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

        // HOMEBUTTON
        let homeButton = this.add.sprite(85, 30, 'homebutton', 0).setOrigin(.5).setInteractive().setScale(.6);
        homeButton.on('pointerup', toggleMenu, this);

        homeButton.on('pointerover', function() {
            this.setFrame(1);
        }, homeButton);

        homeButton.on('pointerout', function() {
            this.setFrame(0);
        }, homeButton);

        function toggleMenu() {
            animalSounds.destroy();
            this.scene.stop(this.scene.key);
            this.scene.launch('GameMenuScene');
        }

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
        arrowLeft.on('pointerover', arrowHover, arrowLeft);
        arrowRight.on('pointerover', arrowHover, arrowRight);
        arrowLeft.on('pointerout', arrowOut, arrowLeft);
        arrowRight.on('pointerout', arrowOut, arrowRight);
        arrowRight.on('pointerdown', rotateAnimals, arrowRight);

        // handle sounds
        animalSounds.on('ended', resetArrows, this);
        animalSounds.on('play', disableArrows, this);

        // make Animals interactive
        for(let i=0; i<animalSprites.length; i++ ){
            animalSprites[i].on('pointerup', playSound, animalSprites[i]);
        }

        // callbacks
        function arrowHover() {
            this.setFrame(2);
        }

        function arrowOut() {
            this.setFrame(1);
        }

        function disableArrows() {
            // arrowLeft.disableInteractive();
            // arrowRight.disableInteractive();
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
            resetArrows();
        }

    }

    update(time, delta) {

    }
}
