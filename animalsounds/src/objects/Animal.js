export class Animal extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.sprite);
        this.scene = config.scene;
        this.name = config.name;
        this.sprite = config.sprite;
        this.sound = config.audio;
        this.x = config.x;
        this.y = config.y;
        this.scale = config.scale;

        this.setDataEnabled();

        // console.log("X: " + this.x);
        // console.log("Y: " + this.y);
        // console.log(this);

        // render animal on creation
        let animalSprite = this.scene.add.sprite(this.x, this.y, 'animaltest', this.sprite).setScale(this.scale).setInteractive().setOrigin(0.5);
        animalSprite.name = this.name;
        animalSprite.class = 'animal';

    }

    getScale() {
        return this.scale;
    }

    getSound() {
        return this.sound;
    }

    getName() {
        return this.name;
    }
}
