class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(2)
        this.body.setAllowGravity(false)
        this.enabled = false
        this.isJumping = false
    }
    enable(){
        this.body.setAllowGravity(true)
        this.enabled = true
    }


    update(){
        if(this.enabled){
            if(this.y==544){
                this.body.setVelocityX(levelSpeed)
                this.isJumping = false
            }
            if((keySpace.isDown || mouseClick)&&!this.isJumping){
                this.body.setVelocityX(0)
                this.isJumping=true
                this.body.setVelocityY(-300)
            }
            
        }
    }

}