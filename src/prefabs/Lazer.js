class Lazer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.world.enable(this);

        this.xStart = x

        this.body.setVelocityX(-levelSpeed*2)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }
    update(){
        if(this.x+32<0){
            this.x = this.xStart
        }
    }
}