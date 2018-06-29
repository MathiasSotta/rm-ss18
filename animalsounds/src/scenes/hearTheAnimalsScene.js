import 'phaser';
import {GameMenuScene} from './gameMenuScene';

export class HearTheAnimalsScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'HearTheAnimalsScene'
        });
    }

    preload() {
        this.load.image('cokecan', 'assets/cokecan.png');

    }

    create() {
        console.log('HearTheAnimalsScene started');
        this.add.text(100, 100, 'HearTheAnimals !', {fill: '#0f0'});

        this.add.image(100, 200, 'cokecan');

        // console.log("Scene Key: "  + this.scene.key);

        this.input.once('pointerdown', function (event) {
            this.scene.start('GameMenuScene');
            this.scene.bringToTop();
            this.scene.stop('HearTheAnimalsScene');
            console.log('From HearTheAnimalsScene back to simple');
        }, this);

    }
}
