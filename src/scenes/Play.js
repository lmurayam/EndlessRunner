class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        console.log("In Play")
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0, 0);

        this.player = new Player(this, width/3,height*2/3,'player')
        
        this.test = new Spawner(this, width+64,height-32)

        this.physics.add.collider(this.player, this.test.blocks)

        this.gameOver = false

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouseClick = false;
        this.input.on('pointerdown', () => {mouseClick = true;});
        this.input.on('pointerup', () => {mouseClick = false;});
    }
    update(){
        html_input(this)
        this.background.tilePositionX += 4;
        if(!this.gameOver){
            this.test.update()
            this.player.update()
        }
        
        if(this.test.blocks.getLength()>10){
            this.player.enable()
        }
    }
}