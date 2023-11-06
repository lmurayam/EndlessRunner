class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        console.log("In Menu")
        this.background = this.add.tileSprite(0, 0, 960, 640, 'menu').setOrigin(0, 0);

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.start = this.add.sprite(width/3,height/2 + 10,'start', 1).setScale(5)
        this.credits = this.add.sprite(width - width/3 - 30,height/2 + 10,'credits', 0).setScale(5)

        this.onStart = true
        this.inCredits = false
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLeft)||Phaser.Input.Keyboard.JustDown(keyRight)){
            this.onStart = !this.onStart
            if (this.onStart){
                this.start.setFrame(1)
                this.credits.setFrame(0)
            }
            else{
                this.start.setFrame(0)
                this.credits.setFrame(1)
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keySpace)){
            if(this.onStart){
                this.scene.start('playScene');
            }
            else{
                this.inCredits = true
            }
            
        }
    }
}