import 'phaser';

import { GameMenuScene } from './scenes/game-menu-scene';
import { HearTheAnimalsScene } from './scenes/hearTheAnimalsScene';

export const gameConfig = {
  width: 800,
  height: 600,
  scene: [
      GameMenuScene,
      HearTheAnimalsScene,
  ]
};

new Phaser.Game(gameConfig);

