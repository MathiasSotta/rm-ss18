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

        let animalNames = [
            {
                key: 'goose',
                ani: 'goosy',
            },
            {
                key: 'elephant',
                ani: 'ely',
            },
            {
                key: 'pig',
                ani: 'pigy',
            },
            {
                key: 'rooster',
                ani: 'rosty',
            },
            {
                key: 'cow',
                ani: 'cowy',
            },
            {
                key: 'dog',
                ani: 'dogy',
            },            {
                key: 'cat',
                ani: 'caty',
            },

        ];

        // define static start positions for the animals
        let positions = AnimalController.getAnimalPosition(this.scene);

        // instantiate animals according to the current scene
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
                {x: (w / 2), y: h / 4}, //center top position
                {x: (w / 5) * 4, y: (h / 4) * 1.9},// right middle
                {x: (w / 5) * 3.5, y: (h / 4) * 3.2}, // right bottom
                {x: (w / 5) * 1.5, y: (h / 4) * 3.2}, // left bottom
                {x: w / 5, y: (h / 4) * 1.9} // left-middle
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
        let animalArri = animalNames.slice(0);

        if (sceneKey === 'GuessTheAnimalsScene') {

            // create 5 random animals from spriteList and set their position
            for (let i = 0; i < 5; i++) {
                let pickedAnimal = Phaser.Utils.Array.RemoveRandomElement(animalArri);
                let newAnimal = this.group.create(gameConfig.width / 2, gameConfig.height / 2, 'animalic', pickedAnimal.key).setInteractive().setScale(0).setOrigin(0.5).setAlpha(0);
                newAnimal.key = pickedAnimal.key;
                newAnimal.name = pickedAnimal.key;
                newAnimal.ani = pickedAnimal.ani;
                newAnimal.class = 'animal';
                newAnimal.destinationX = positions[i].x;
                newAnimal.destinationY = positions[i].y;
            }
        }
        else if (sceneKey === 'HearTheAnimalsScene') {
            // create all animals from spriteList
            for (let animal of animalArri) {
                let newAnimal = this.group.create(positions[0].x, positions[0].y, 'animalic', animal.key).setScale(.8).setOrigin(.5).setVisible(false);
                newAnimal.key = animal.key;
                //newAnimal.name = animal;
                newAnimal.class = 'animal';
                newAnimal.setInteractive();
                newAnimal.on('pointerup', function () {
                    console.log("animal clicked");
                });
            }
        }
    }

    randomPickAnimal() {
        let pickRandom = Phaser.Utils.Array.GetRandom(this.animals.getChildren());
        return pickRandom.key;
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
