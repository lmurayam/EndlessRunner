// load scene from https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/Load.js
class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }
    preload(){
        console.log("In Load")
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, height/2, width * value, 5);      // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
        this.load.path = './assets/';
        this.load.image('ground','ground.png')
        this.load.spritesheet('start','start.png', {
            frameWidth: 39,
            frameHeight: 16
        })
        this.load.spritesheet('credits','credits.png', {
            frameWidth: 53,
            frameHeight: 16
        })
        this.load.spritesheet('restart','restart.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('menuButton','menuButton.png', {
            frameWidth: 32,
            frameHeight: 16
        })
        this.load.spritesheet('player','player.png', {
            frameWidth: 16,
            frameHeight: 32
        })
        this.load.image('menu','menu.png')
        this.load.image('creditScreen','creditScreen.png')
        this.load.image('particle','particle.png')
        this.load.image('screw_body','screw_body.png')
        this.load.image('screw_head','screw_head.png')
        this.load.image('box','box.png')
        this.load.image('lazer','lazer.png')
        this.load.image('background','background.png')
        //
        this.load.audio('bgm', ['backgroundSong.mp3']);

        this.load.audio('sfx_death', ['sfx_death.mp3']);
        this.load.audio('sfx_jetpack', ['sfx_jetpack.mp3']);
        this.load.audio('sfx_select', ['sfx_select.mp3']);
        this.load.audio('sfx_confirm', ['sfx_confirm.mp3']);

    }
    create(){
        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume:  .5,
            rate: 1,
            loop: true 
        });
        this.anims.create({
            key: 'playerLoop',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player',{
                start: 0,
                end: 7
            }),
            loop: true
        })
        this.bgm.play();
        this.scene.start('menuScene');
    }
}