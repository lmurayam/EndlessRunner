class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        console.log("In Play")
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0, 0);

        this.player = new Player(this, width/3,height*2/3,'player')
        
        this.controller = new Controller(this)

        this.controller.spawners.getChildren().forEach(spawner => {
            this.physics.add.collider(this.player,spawner.blocks)
        })

        this.gameOver = false

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouseClick = false;
        this.input.on('pointerdown', () => {mouseClick = true;});
        this.input.on('pointerup', () => {mouseClick = false;});
    }
    update(){
        html_input(this)
        this.background.tilePositionX += 4
        if(!this.gameOver){
            this.controller.update()
            this.player.update()
        }
        
        if(this.controller.spawner0.blocks.getLength()>10){
            //this.player.enable()
        }
    }
}