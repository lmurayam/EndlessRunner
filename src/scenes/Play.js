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
        this.player.play('playerLoop')
        
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
        this.rockets = false

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
        this.lazerStart = false

        this.lazerWarning = this.add.text(width/2 , height/25, "AVOID LASER", textConfig);
        this.lazerWarning.setVisible(false)

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
                if(this.timeElapsed == 15){ 
                    this.lazerStart = true
                    this.lazerWarning.setVisible(true)
                    this.lazer = new Lazer(this,width+32,height/6,'lazer')
                    this.physics.add.collider(this.player,this.lazer, (player,lazer)=>{
                        player.x = -128
                        player.setAlpha(0)
                    })
                    // gets harder after buffer clears
                    this.controller.levelBuffer.hole_range = [3,6]
                    this.controller.levelBuffer.hole_size = [2,4]
                    this.controller.levelBuffer.screw_range = [5,8]
                    this.controller.levelBuffer.screw_length = [2,5]
                    this.controller.levelBuffer.stair_range = [10,15]
                    this.controller.levelBuffer.stair_size = [2,5]
                }
            },
            callbackScope: this,
            loop: true,
        })

        this.restart = this.add.sprite(width/3,height/2,'restart', 1).setScale(5.5).setAlpha(0).setDepth(1)
        this.menuButton = this.add.sprite(width - width/3,height/2,'menuButton', 0).setScale(5).setAlpha(0).setDepth(1)
        this.onRestart = true

        this.jetpack = this.sound.add('sfx_jetpack', { 
            mute: false,
            volume:  0,
            rate: 1,
            loop: true 
        });
        this.jetpack.play()

        this.dead = false
    }
    update(){
        html_input(this)
        this.background.tilePositionX += 4
        if(this.gameOver){
            if(highScore<this.timeElapsed){
                highScore = this.timeElapsed
            }
            this.restart.setAlpha(1)
            this.menuButton.setAlpha(1)
            if (Phaser.Input.Keyboard.JustDown(keyLeft)||Phaser.Input.Keyboard.JustDown(keyRight)){
                this.sound.play('sfx_select');
                this.onRestart = !this.onRestart
                if (this.onRestart){
                    this.restart.setFrame(1).setScale(5.5)
                    this.menuButton.setFrame(0).setScale(5)
                }
                else{
                    this.restart.setFrame(0).setScale(5)
                    this.menuButton.setFrame(1).setScale(5.5)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keySpace)){
                this.sound.play('sfx_confirm');
                if(this.onRestart){
                    this.scene.restart()
                }
                else{
                    this.scene.start('menuScene');
                    this.jetpack.stop()
                }
                
            }
        }
        if(!this.gameOver){
            this.controller.update()
            this.player.update()
            if(this.lazerStart){
                this.lazer.update()
            }
            if(this.player.isFlying){
                this.jetpack.volume = 0.5
            }
            if(!this.player.isFlying){
                this.jetpack.volume = 0
            }
        }

        if(this.player.enabled&&(this.player.x<0 || this.player.y>height)){
            this.gameOver = true
            if(!this.dead){
                this.sound.play('sfx_death')
                this.dead = true
            }
            this.jetpack.volume = 0
            this.jetpack.stop()
        }
        
        if(this.controller.spawner0.blocks.getLength()>10){
            this.player.enable()
        }
    }
}