export default function makeAnimations(scene) {
    let animConfig = {
        key: 'goosy',
        frames: scene.anims.generateFrameNames('goosy', {prefix: 'goosy_', end: 80, zeroPad: 4}),
        frameRate: 60,
        repeat: 1,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

        animConfig = {
        key: 'ely',
        frames: scene.anims.generateFrameNames('ely', {prefix: 'ely_', end: 59, zeroPad: 4}),
        frameRate: 60,
        repeat: 1,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

    animConfig = {
        key: 'pigy',
        frames: scene.anims.generateFrameNames('pigy', {prefix: 'pigy_', end: 59, zeroPad: 4}),
        frameRate: 60,
        repeat: 1,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

    animConfig = {
        key: 'rosty',
        frames: scene.anims.generateFrameNames('rosty', {prefix: 'rosty_', end: 59, zeroPad: 4}),
        frameRate: 60,
        repeat: 1,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

    animConfig = {
        key: 'cowy',
        frames: scene.anims.generateFrameNames('cowy', {prefix: 'cowy_', end: 59, zeroPad: 4}),
        frameRate: 45,
        repeat: 0,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

    animConfig = {
        key: 'dogy',
        frames: scene.anims.generateFrameNames('dogy', {prefix: 'dogy_', end: 59, zeroPad: 4}),
        frameRate: 60,
        repeat: 1,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);

    animConfig = {
        key: 'caty',
        frames: scene.anims.generateFrameNames('caty', {prefix: 'caty_', end: 59, zeroPad: 4}),
        frameRate: 30,
        repeat: 0,
        yoyo: true,
        //hideOnComplete: true,
    };
    scene.anims.create(animConfig);


}