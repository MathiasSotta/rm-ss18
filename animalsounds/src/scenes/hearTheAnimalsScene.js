import 'phaser';
import {GameMenuScene} from './gameMenuScene';
import {gameConfig} from "../index";

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
        console.log(this.scene);

        // ToDo: Remove Helper texts
        this.add.text(gameConfig.width / 2, 100, this.scene.key, {fill: '#df0'}).setOrigin(.5);


        // console.log("Scene Key: "  + this.scene.key);

        this.input.once('pointerdown', function (event) {
            this.scene.start('GameMenuScene');
            this.scene.bringToTop();
            this.scene.stop('HearTheAnimalsScene');
            console.log('From HearTheAnimalsScene back to simple');
        }, this);

    }
}
