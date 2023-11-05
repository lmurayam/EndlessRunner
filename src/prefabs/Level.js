/*
Controller and Spawner
Spawner creates a single physics object in it's row
Controller tells the spawners what to create
*/
class Spawner extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
        super(scene,x,y)
        scene.add.existing(this)
        this.blocks = scene.add.group();
        this.current_texture = null
        
        this.last_block = null
    }
    create_block(texture){
        const block = new LevelObj(this.scene, this.x, this.y,texture)
        this.blocks.add(block)
        this.last_block = block
    }
    update(){
        this.blocks.getChildren().forEach(child => {
            child.update()
        });
        if (this.last_block==null||this.last_block.x < width+2){
            this.create_block('ground')
        }
    }
}