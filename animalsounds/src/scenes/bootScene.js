import * as Phaser from "phaser";
import makeAnimations from "../helper/animations";

export class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene',
        });
    }

    preload() {

        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 20);
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            progress.destroy();
            this.scene.start('GameMenuScene');
        });

        // preload assets
        this.load.atlas('animalic', 'assets/animals.png', 'assets/animals.json');
        this.load.atlas('sceneitems', 'assets/sceneitems.png', 'assets/sceneitems.json');
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
        // init game music
        let music = this.sound.add('music');
        music.loop = true;

    }


}


