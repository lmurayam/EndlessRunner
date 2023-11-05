class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(2)
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(false)
        this.enabled = false
        this.isColliding = false
        this.isJumping = false
        this.targetX= x
        this.body.setFriction(0)
    }
    enable(){
        this.body.setAllowGravity(true)
        this.enabled = true
        this.body.setCollideWorldBounds(true)
    }


    update(){
        if(this.enabled){
            if (this.x>this.targetX){
                this.body.setVelocityX(0)
            }
            else{
                this.body.setVelocityX(levelSpeed)
            }
            if((keySpace.isDown || mouseClick)&&!this.isJumping){
                //this.isJumping=true
                this.body.setVelocityY(-300)
            }
            
        }
    }

}