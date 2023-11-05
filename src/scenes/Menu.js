class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        console.log("In Menu")
        this.scene.start('playScene');
    }
    update(){
        html_input(this)
    }
}