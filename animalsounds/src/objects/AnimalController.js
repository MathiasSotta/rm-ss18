import { Animal } from "./Animal";

// put all animals in array
let animalArri = [];


export class AnimalController {

    constructor(theScene) {
        this.animals = animalArri;
        this.scene = theScene;
        let animalSprites = theScene.textures.list.animaltest.frames;

        // wtf .. using static array here
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
        for (let i=0; i<5; i++) {
            let picked = Phaser.Utils.Array.RemoveRandomElement(pickIt);
            console.log("i=" + i);
            console.log("pick=" + picked);

            // add selected animal
            animalArri.push(
                new Animal({
                    scene: this.scene,
                    x: positions[i].x,
                    y: positions[i].y,
                    sprite: picked,
                    audio: '',
                    scale: .3,
                })
            );
        }
        console.log(pickIt);

    }

    getAnimals() {
        return this.animals;
    }


}
