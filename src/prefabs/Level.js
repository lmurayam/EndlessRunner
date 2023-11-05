/*
Level, Controller, and Spawner
Level creates a random set level
Spawner creates a single physics object in it's row
Controller tells the spawners what to create
*/
class Level{
    constructor(length=128,height=16){
        this.x = length //length
        this.y = height //height
        //Create the empty level map
        this.map = []

        this.hole_range      =   [2,5]   //Range of possible holes
        this.hole_size       =   [1,4]   //Range of possible hole size
        this.screw_range     =   [5,15]  //Range of possible srews
        this.screw_length    =   [1,3]   //Range of possible screw length
        this.stair_range     =   [3,6]   //Range of possible stairs
        this.stair_size      =   [2,4]   //Range of possible stair size
    }
    initialize(){
        /*
        -   =   Empty Space
        X   =   Ground
        B   =   Box
        T   =   Screw head
        |   =   Screw body
        O   =   Coin
        */ 

        //fill empty array
        for (let i = 0; i < this.y; i++){
            this.map[i] = new Array(this.x).fill('-')
        }

        //intialize ranges
        let num_holes       =   Phaser.Math.Between(...this.hole_range)
        let num_pipes       =   Phaser.Math.Between(...this.screw_range)
        let num_stairs      =   Phaser.Math.Between(...this.stair_range)
        let repeats         =   5
        let tries           =   0
        console.log(num_holes,num_pipes,num_stairs)

        //create ground
        for (let i = 0; i < this.x; i++){
            this.map[0][i] = 'X'
        }

        //helper for creating holes
        let valid_ground = []
        for (let i = 3; i < this.x-3; i++){
            valid_ground.push(i)
        }

        //Create holes
        let holes = [] //List containing holes, a hole is a list [x,y] inclusive

        while (holes.length<num_holes&&tries<repeats){
            tries += 1
            let size = Phaser.Math.Between(...this.hole_size)
            let valid_location = false
            let location = null
            while(!valid_location){
                location = Phaser.Math.RND.pick(valid_ground)
                valid_location = true
                for (let i = location-1; i < location+size+1; i++){
                    if (this.map[0][i]!='X'){
                        valid_location = false
                        break
                    }
                }
            }
            for (let i = location; i < location+size; i++){
                this.map[0][i]='-'
                valid_ground.pop(i)

            }
            holes.push([location,location+size-1])
        }
        tries = 0;
    }
}

class Spawner extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
        super(scene,x,y)
        scene.add.existing(this)
        this.blocks = scene.add.group();
        this.current_texture = null
        
        this.last_block = null
        this.levelArray = []
    }
    feed_array(levelArray){
        this.levelArray = levelArray
    }
    create_block(id){
        let block
        switch (id){
            case 'X':
                block = new LevelObj(this.scene, this.x, this.y,'ground')
                this.blocks.add(block)
                break
            case '-':
                block = new LevelObj(this.scene, this.x, this.y,'ground')
                block.setAlpha(0)
                break
        }

        
        
        this.last_block = block
    }
    update(){
        this.blocks.getChildren().forEach(block => {
            block.update()
        });
        if (this.last_block==null||this.last_block.x < width + 8){

            this.create_block(this.levelArray.shift())
        }
    }
}

class Controller{
    constructor(scene){
        this.spawners = scene.add.group()
        this.spawner1 = new Spawner(scene, width+64,height-32)
        this.spawner1.feed_array(Array(10).fill('X'))
        this.spawners.add(this.spawner1)

        this.levelBuffer = new Level(64,4)
    }
    update(){
        if (this.spawner1.levelArray.length<=1){
            this.levelBuffer.initialize()
            console.log(this.levelBuffer.map)
            this.spawner1.feed_array(this.levelBuffer.map.shift())
        }
        this.spawners.getChildren().forEach(spawner => {
            spawner.update()
        });
    }
}