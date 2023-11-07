/*
LUKE MURAYAMA
ROBOT RUNNER

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