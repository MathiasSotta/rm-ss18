import 'phaser';
import {gameConfig} from "../index";
import {AnimalController} from "../objects/AnimalController";

export class HearTheAnimalsScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'HearTheAnimalsScene'
        });
    }

    preload() {
    }

    create() {
        console.log('HearTheAnimalsScene started');

        let theScene = this;
        let animalSounds = this.sound.addAudioSprite('animalsounds');

        let arrowLeft;
        let arrowRight;
        let animalAnimation;
        let animationRunning = false;

        // MUSICBUTTON
        let musicButton = this.add.image(35, 30, 'sceneitems', 'musicon_off').setOrigin(.5).setInteractive().setScale(.6);
        musicButton.on('pointerup', toggleMusic, this);
        musicButton.on('pointerover', () => {
            musicButton.setFrame('musicon_over')
        });
        musicButton.on('pointerout', updateMusicButton, this);

        // update state when reentering scene
        updateMusicButton();

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

        // HOMEBUTTON
        let homeButton = this.add.image(85, 30, 'sceneitems', 'homebutton').setInteractive().setOrigin(.5).setScale(.6);
        homeButton.on('pointerup', toggleMenu, this);

        homeButton.on('pointerover', function () {
            this.setFrame('homebutton_over');
        }, homeButton);

        homeButton.on('pointerout', function () {
            this.setFrame('homebutton');
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
        makeAnimalsInteractive();
        Phaser.Utils.Array.Shuffle(animalSprites);
        let currentAnimal = Phaser.Utils.Array.GetFirst(animalSprites);
        // console.log(currentAnimal);
        currentAnimal.setVisible(true);

        // Set Arrows for animal selection
        arrowLeft = this.add.image((gameConfig.width / 5), gameConfig.height / 2,  'sceneitems', 'arrow_default').setInteractive().setScale(.4).setOrigin(0.5).setFlipX(true);
        arrowRight = this.add.image((gameConfig.width / 5) * 4, gameConfig.height / 2, 'sceneitems', 'arrow_default').setScale(.4).setInteractive().setOrigin(0.5);

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
        for (let i = 0; i < animalSprites.length; i++) {
            animalSprites[i].on('pointerup', playSound, animalSprites[i]);
        }

        // callbacks
        function arrowHover() {
            this.setFrame('arrow_hover');
        }

        function arrowOut() {
            this.setFrame('arrow_default');
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
            //console.log(animalSounds.isPlaying);
        }

        function rotateAnimals() {
            //console.log(this);

            // if an animation is currently active it is destroyed
            if (animationRunning) {
                animalAnimation.destroy();
            }

            animalSprites[0].setVisible(false).setInteractive(false);
            let animalRotate = this === arrowLeft ? Phaser.Utils.Array.RotateLeft(animalSprites) : Phaser.Utils.Array.RotateRight(animalSprites);
            animalSprites[animalSprites.length - 1].setVisible(false);
            animalSprites[0].setVisible(true).setInteractive(true);
            resetArrows();
        }

        function makeAnimalsInteractive() {
            for (let i = 0; i < animalSprites.length; i++) {
                // get interactive animals
                animalSprites[i].setInteractive();
                animalSprites[i].on('pointerup', playAnimalSpritesAnimation, animalSprites[i]);
            }
        }

        function playAnimalSpritesAnimation(animal) {
            console.log(this);
            this.setVisible(false);

            let config = {
                key: this.ani,
                x: this.x,
                y: this.y,
                scale: 0.8,
                anims: this.ani,
            };

            animalAnimation = this.scene.make.sprite(config);
            animationRunning = true;
            animalAnimation.on('animationcomplete', function () {
                this.setVisible(true);
                animalAnimation.destroy();
            }, this);

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

    update(time, delta) {

    }
}

