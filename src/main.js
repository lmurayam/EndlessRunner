/*
LUKE MURAYAMA
ROBOT RUNNER
20 HOURS

Something that I think is technically interesting and that I'm proud of is level creation in Level.js.
Essentially there are 3 parts, the level generation, controller, and spawner.
Level generation creates an X by Y sized level with holes, screws, and stairs of varying quantity and size.
Controller takes the level data, and splits it into rows to give to the spawners, creating new levels when spawners are almost empty
Spawners take the level row array, and produces blocks based on what the array holds.
Given the way it is coded, I'm pretty sure you should be able to scale the level height and length as much as you want.

I'm proud of the music since I have never made music for a game before, even if it's not the best. 

*/ 
let config = {
    parent: 'gameCanvas',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    render: {
        pixelArt: true
    },
    physics:{
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 600
            }
        }
    },
    scene: [Load, Menu, Play],
}

let game = new Phaser.Game(config)

let { width, height } = game.config

let levelSpeed = 250

let highScore = 0

let keySpace, mouseClick, keyLeft, keyRight

function html_input(scene){
    let debug = document.getElementById('debugToggle');
    debug.addEventListener('input', function(){
        //https://phaser.discourse.group/t/turn-on-off-debug-at-runtime/3681/2
        if(this.checked){
            scene.physics.world.drawDebug = true;      
        }
        else{
            scene.physics.world.drawDebug = false;
            scene.physics.world.debugGraphic.clear();
        }
    });
}