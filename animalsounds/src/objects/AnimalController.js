import {Animal} from "./Animal";
import {gameConfig} from "../index";

// put all animals into an array
//let animalArri = [];

export class AnimalController extends Phaser.GameObjects.GameObjectFactory {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.group = this.scene.add.group();
        this.animals = this.group;
        this.makeAnimals();
    }

    makeAnimals() {

        // using static array here o_O
        let animalNames = [
            'goose',
            'elephant',
            'pig',
            'rooster',
            'cow',
            'dog',
            'cat',
        ];

        // define static start positions for the animals
        let positions = AnimalController.getAnimalPosition(this.scene);

        // instantiate Animals according to the current scene
        let inPosition = this.setAnimalsInScene(animalNames, positions);

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

    static getAnimalPosition(theScene) {
        let p;
        let w = gameConfig.width;
        let h = gameConfig.height;
        if (theScene.sys.config.key === 'GuessTheAnimalsScene') {
            p = [
                {x: (w / 2), y: h / 4},
                {x: (w / 5) * 4, y: (h / 4) * 2},
                {x: (w / 5) * 3.5, y: (h / 4) * 3.2},
                {x: (w / 5) * 1.5, y: (h / 4) * 3.2},
                {x: w / 5, y: (h / 4) * 2}
            ];
        }
        else if (theScene.sys.config.key === 'HearTheAnimalsScene') {
            p = [
                {x: gameConfig.width / 2, y: gameConfig.height / 2}
            ];
        }
        return p;
    }

    setAnimalsInScene(animalNames, positions) {

        let sceneKey = this.scene.sys.config.key;
        // clone the array, just in case
        let pickIt = animalNames.slice(0);

        if (sceneKey === 'GuessTheAnimalsScene') {

            // create 5 random animals from spriteList and set their position
            for (let i = 0; i < 5; i++) {
                let pickedAnimal = Phaser.Utils.Array.RemoveRandomElement(pickIt);
                let newAnimal = this.group.create(positions[i].x, positions[i].y, 'animalic', pickedAnimal).setScale(.5).setOrigin(0.5);
                newAnimal.name = pickedAnimal;
                newAnimal.class = 'animal';
            }
        }
        else if (sceneKey === 'HearTheAnimalsScene') {

        }
    }

    randomPickAnimal() {
        let pickRandom = Phaser.Utils.Array.GetRandom(this.animals.getChildren());
        return pickRandom.name;
    };

    getGroup() {
        return this.group;
    }

    removeAnimalGroup() {
        this.group.clear(true, true);


    }

    soundIsPlaying() {
        return this.scene.sound.duration;
    }
}
