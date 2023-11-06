class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        this.physics.world.setBounds(0, 90,width,height-90,false,true,true,false)
        console.log("In Play")
        this.score = 0
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0, 0);

        this.player = new Player(this, width/3,height*2/3,'player')
        this.player.x=0
        this.player.body.setVelocityX(levelSpeed/2)
        
        this.controller = new Controller(this)

        this.controller.spawners.getChildren().forEach(spawner => {
            this.physics.add.collider(this.player,spawner.blocks)
        })

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouseClick = false;
        this.input.on('pointerdown', () => {mouseClick = true;});
        this.input.on('pointerup', () => {mouseClick = false;});
        this.gameOver = false
    }
    update(){
        html_input(this)
        this.background.tilePositionX += 4
        if(!this.gameOver){
            this.controller.update()
            this.player.update()
        }

        if(this.player.enabled&&(this.player.x<0 || this.player.y>height)){
            this.gameOver = true
            this.scene.restart();
        }
        
        if(this.controller.spawner0.blocks.getLength()>10){
            this.player.enable()
        }
    }
}