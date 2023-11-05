class LevelObj extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.world.enable(this);

        this.body.setVelocityX(-levelSpeed)
        this.setScale(2)
        this.body.setAllowGravity(false)
        this.body.setImmovable(true)
    }
    update(){
        //this.x -= 4
        if(this.x+128<0){
            this.destroy()
        }
    }
}