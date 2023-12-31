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
        this.isFlying = false
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
            this.isFlying = false
            if((keySpace.isDown || mouseClick)){
                let fragments = this.scene.add.particles(this.x, this.y+32, 'particle', {
                    speed: 100,
                    lifespan: 150,
                    gravityY: 1000,
                    emitting: false
                });
                fragments.explode(16);
                this.body.setVelocityY(-300)
                this.isFlying = true
            }
            
        }
        else{
            let fragments = this.scene.add.particles(this.x, this.y+32, 'particle', {
                speed: 100,
                lifespan: 150,
                gravityY: 1000,
                gravityX: 100,
                emitting: false
            });
            fragments.explode(16)
            this.isFlying = true
        }
    }

}