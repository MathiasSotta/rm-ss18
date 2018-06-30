import {Animal} from "./Animal";

// put all animals into an array
//let animalArri = [];

export class AnimalController extends Phaser.GameObjects.GameObjectFactory {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        /*this.createAnimals();*/
        this.group = this.scene.add.group();
        this.animals = this.group;

        this.makeAnimals()

    }

    makeAnimals() {
        // using static array here o_O
        let animalNames = [
            'giraffe',
            'rabbit',
            'elephant',
            'monkey',
            'panda',
            'snake',
            'pig',
            'parrot',
            'hippo',
            'penguin',
        ];

        // clone the array, just in case
        let pickIt = animalNames.slice(0);

        // define static start positions for the animals
        let positions = [
            {x: 100, y: 100},
            {x: 400, y: 200},
            {x: 700, y: 100},
            {x: 200, y: 300},
            {x: 600, y: 300}
        ];

        // create 5 random animals from spriteList and set their position
        for (let i = 0; i < 5; i++) {
            let pickedAnimal = Phaser.Utils.Array.RemoveRandomElement(pickIt);

            let newAnimal = this.group.create(positions[i].x, positions[i].y, 'animaltest', pickedAnimal).setScale(.3).setInteractive().setOrigin(0.5);
            newAnimal.name = pickedAnimal;
            newAnimal.class = 'animal';

        }

    }

    getAnimals() {
        return this.animals;
    }
    getAnimalByName(animalName) {
        for (let item of this.animals) {
            if (item.name === animalName) {
                // console.log(item);
                return item;
            }
        }
    };

    randomPickAnimal() {
        let pickRandom = Phaser.Utils.Array.GetRandom(this.animals.getChildren());
        return pickRandom.name;
    };

    getGroup() {
        return this.group;
    }

    removeAnimalGroup() {
        this.group.clear(true,true);
    }
}
