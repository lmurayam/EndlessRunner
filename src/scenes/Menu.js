class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    create(){
        this.physics.world.drawDebug = false;
        console.log("In Menu")
        this.background = this.add.tileSprite(0, 0, 960, 640, 'menu').setOrigin(0, 0);
        this.creditScreen = this.add.tileSprite(0, 0, 960, 640, 'creditScreen').setOrigin(0, 0);
        this.creditScreen.setAlpha(0)

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.start = this.add.sprite(width/3,height/2 + 10,'start', 1).setScale(5.5)
        this.credits = this.add.sprite(width - width/3 - 30,height/2 + 10,'credits', 0).setScale(5)

        this.onStart = true
        this.inCredits = false

        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#5Fcde4',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        this.score = this.add.text(width/2, height-height/25, "HIGH SCORE: "+highScore, textConfig).setOrigin(0.5)
        
    }
    update(){
        if(this.inCredits){
            if (Phaser.Input.Keyboard.JustDown(keySpace)){
                this.inCredits = false
                this.creditScreen.setAlpha(0).setDepth(0)
                }  
            }
        else{
            if (Phaser.Input.Keyboard.JustDown(keyLeft)||Phaser.Input.Keyboard.JustDown(keyRight)){
                this.onStart = !this.onStart
                if (this.onStart){
                    this.start.setFrame(1).setScale(5.5)
                    this.credits.setFrame(0).setScale(5)
                }
                else{
                    this.start.setFrame(0).setScale(5)
                    this.credits.setFrame(1).setScale(5.5)
                }
            }
            if (Phaser.Input.Keyboard.JustDown(keySpace)){
                if(this.onStart){
                    this.scene.start('playScene');
                }
                else{
                    this.inCredits = true
                    this.creditScreen.setAlpha(1).setDepth(1)
                }
                
            }
        }
    }
}