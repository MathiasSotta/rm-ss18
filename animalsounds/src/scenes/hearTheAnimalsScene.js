import 'phaser';
import { GameMenuScene } from './game-menu-scene';

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
    this.add.text(100, 100, 'HearTheAnimalsScene', { fill: '#0f0' });
    this.add.image(100, 200, 'cokecan');

    // this.scene.key = 'simplescene';

        console.log("Scene Key: "  + this.scene.key);
      // this.scene.bringToTop();


      this.input.once('pointerdown', function (event) {
          // this.scene.stop('HearTheAnimalsScene');
          this.scene.start('GameMenuScene');
          this.scene.bringToTop();
          this.scene.stop('HearTheAnimalsScene');
          console.log('From HearTheAnimalsScene back to simple');
      }, this);

  }
}
