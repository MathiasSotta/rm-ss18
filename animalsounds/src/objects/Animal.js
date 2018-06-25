export class Animal extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.sprite, config.audio, config.scale);
        //config.scene.physics.world.enable(this);
        //this.scene.add.existing(this);
        this.scene = config.scene;
        this.name = config.sprite;
        this.sprite = config.sprite;
        this.sound = config.sound;
        this.x = config.x;
        this.y = config.y;
        this.scale = config.scale;
        this.setDataEnabled();

        // console.log("X: " + this.x);
        // console.log("Y: " + this.y);
        // console.log(this);

        // render animal on creation
        this.scene.add.sprite(this.x, this.y, 'animaltest', this.sprite).setScale(this.scale).setOrigin(0.5);

        //
    }

    getScale(){
        return this.scale;
    }

}
