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

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        mouseClick = false;
        this.input.on('pointerdown', () => {mouseClick = true;});
        this.input.on('pointerup', () => {mouseClick = false;});
        this.gameOver = false

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#5Fcde4',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.timeCounter = this.add.text(width/25 , height/25, "SPACE OR CLICK TO FLY", textConfig);

        textConfig.fixedWidth = 100
        this.timeElapsed = 0
        this.timeCounter = this.add.text(width-width/6, height/25, this.timeElapsed, textConfig);
        this.time.addEvent({
            delay:1000,
            callback: function(){
                if(this.gameOver == false){
                    this.timeElapsed += 1
                    this.timeCounter.text = this.timeElapsed; 
                }      
            },
            callbackScope: this,
            loop: true,
        })

        this.restart = this.add.sprite(width/3,height/2,'restart', 1).setScale(5).setAlpha(0).setDepth(1)
        this.menuButton = this.add.sprite(width - width/3,height/2,'menuButton', 0).setScale(5).setAlpha(0).setDepth(1)
        this.onRestart = true
    }
    update(){
        html_input(this)
        this.background.tilePositionX += 4
        if(this.gameOver){
            this.restart.setAlpha(1)
            this.menuButton.setAlpha(1)
            if (Phaser.Input.Keyboard.JustDown(keyLeft)||Phaser.Input.Keyboard.JustDown(keyRight)){
                this.onRestart = !this.onRestart
                if (this.onRestart){
                    this.restart.setFrame(1)
                    this.menuButton.setFrame(0)
                }
                else{
                    this.restart.setFrame(0)
                    this.menuButton.setFrame(1)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keySpace)){
                if(this.onRestart){
                    this.scene.restart()
                }
                else{
                    this.scene.start('menuScene');
                }
                
            }
        }
        if(!this.gameOver){
            this.controller.update()
            this.player.update()
        }

        if(this.player.enabled&&(this.player.x<0 || this.player.y>height)){
            this.gameOver = true
        }
        
        if(this.controller.spawner0.blocks.getLength()>10){
            this.player.enable()
        }
    }
}