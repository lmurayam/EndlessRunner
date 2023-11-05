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
        */ 

        //fill empty array
        for (let i = 0; i < this.y; i++){
            this.map[i] = new Array(this.x).fill('-')
        }

        //intialize ranges
        let num_holes       =   Phaser.Math.Between(...this.hole_range)
        let num_screws       =   Phaser.Math.Between(...this.screw_range)
        let num_stairs      =   Phaser.Math.Between(...this.stair_range)
        let repeats         =   5
        let tries           =   0
        console.log(num_holes,num_screws,num_stairs)

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

        while (holes.length<num_holes){
            tries = 0;
            let size = Phaser.Math.Between(...this.hole_size)
            let valid_location = false
            let location = null
            while(!valid_location&&tries<repeats){
                location = Phaser.Math.RND.pick(valid_ground)
                valid_location = true
                for (let i = location-1; i < location+size+1; i++){
                    if (this.map[0][i]!='X'){
                        valid_location = false
                        tries += 1
                        break
                    }
                }
            }
            if (valid_location = false){
                break
            }
            for (let i = location; i < location+size; i++){
                this.map[0][i]='-'
                let index = valid_ground.indexOf(i)
                if (index != -1) {
                    valid_ground.splice(index, 1)
                }

            }
            holes.push([location,location+size-1])
        }
        

        //Create screws
        let screws = []

        while (screws.length<num_screws){
            let length = Phaser.Math.Between(...this.screw_length)
            let valid_location = false
            let location = null
            tries = 0;
            while(!valid_location&&tries<repeats){
                valid_location = true
                location = Phaser.Math.RND.pick(valid_ground)
                for (let i = location-1; i <= location+1; i++){
                    if (this.map[0][i]!='X'){
                        valid_location = false
                        tries += 1
                        break
                    }
                }
            }
            if (valid_location==false){
                break
            }
            let screwBody = []
            for (let i = 1; i <= length; i ++){
                screwBody.push([i,location])
            }
            for (let screw of screwBody) {
                let y = screw[0];
                let x = screw[1];
                
                if (screw == screwBody[screwBody.length-1]) {
                    this.map[y][x] = 'T';
                } else {
                    this.map[y][x] = '|';
                }
            }
            screws.push(location)

            for (let i = location-1; i <= location+1; i++){
                let index = valid_ground.indexOf(i)
                if (index != -1) {
                    valid_ground.splice(index, 1)
                }
            }
            
        }

        //Create stairs
        let stairs = []

        while (stairs.length<num_stairs){
            let size = Phaser.Math.Between(...this.stair_size)
            let valid_location = false
            let location = null
            let location_range = null
            tries = 0;
            while(!valid_location&&tries<repeats){
                valid_location = true
                location = Phaser.Math.RND.pick(valid_ground)
                //find continuous numbers around
                location_range = []
                let x = valid_ground.indexOf(location)
                while (x>0){
                    if (valid_ground[x-1] == valid_ground[x] -1){
                        location_range.push(valid_ground[x-1])
                        x -= 1
                    }
                    else{
                        break
                    }
                }
                location_range.reverse()
                location_range.push(location)
                x = valid_ground.indexOf(location)
                while(x<valid_ground.length-1){
                    if (valid_ground[x+1] == valid_ground[x] +1){
                        location_range.push(valid_ground[x+1])
                        x += 1
                    }
                    else{
                        break
                    }
                }
                ///
                if (size>location_range.length){
                    tries += 1
                    valid_location = false
                }
            }
            if (valid_location==false){
                break
            }
            //stairs go down
            if (Math.random()<.5){
                let tallest = Phaser.Math.RND.between(0,location_range.length-size)
                location = location_range[tallest]
                let remaining = size
                while (remaining>0){
                    for (let i = 0; i < remaining; i++){
                        this.map[1+(size-remaining)][location+i]='B'
                        let index = valid_ground.indexOf(location+i)
                        if (index != -1) {
                            valid_ground.splice(index, 1)
                        }
                    }
                    remaining -= 1
                }
            }
            //stairs go up
            else{
                let tallest = Phaser.Math.RND.between(size-1,location_range.length-1)
                location = location_range[tallest]
                let remaining = size
                while (remaining>0){
                    for (let i = 0; i < remaining; i++){
                        this.map[1+(size-remaining)][location-remaining+i+1]='B'
                        let index = valid_ground.indexOf(location-remaining+i+1)
                        if (index != -1) {
                            valid_ground.splice(index, 1)
                        }
                    }
                    remaining -= 1
                }
            }
        }
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
            case 'T':
                block = new LevelObj(this.scene, this.x, this.y,'screw_head')
                this.blocks.add(block)
                break
            case '|':
                    block = new LevelObj(this.scene, this.x, this.y,'screw_body')
                    this.blocks.add(block)
                    break
            case 'B':
                    block = new LevelObj(this.scene, this.x, this.y,'box')
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
        
        this.spawner0 = new Spawner(scene, width+64,height-32)
        this.spawner1 = new Spawner(scene, width+64,height-96)
        this.spawner2 = new Spawner(scene, width+64,height-160)
        this.spawner3 = new Spawner(scene, width+64,height-224)
        this.spawner4 = new Spawner(scene, width+64,height-288)
        this.spawner0.feed_array(Array(10).fill('X'))
        this.spawner1.feed_array(Array(10).fill('-'))
        this.spawner2.feed_array(Array(10).fill('-'))
        this.spawner3.feed_array(Array(10).fill('-'))
        this.spawner4.feed_array(Array(10).fill('-'))
        this.spawners = scene.add.group([this.spawner0,this.spawner1,this.spawner2,this.spawner3,this.spawner4])

        this.levelBuffer = new Level(128,5)

        this.levelBuffer.initialize()
        console.log(this.levelBuffer.map)
    }
    update(){
        if (this.spawner0.levelArray.length<=1){
            this.levelBuffer.initialize()
            this.spawners.getChildren().forEach(spawner => {
                spawner.feed_array(this.levelBuffer.map.shift())
            });
            
        }
        this.spawners.getChildren().forEach(spawner => {
            spawner.update()
        });
    }
}