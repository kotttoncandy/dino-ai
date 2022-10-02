class Player {
    constructor(jumping, distance,tag, weight1, weight2, fitness, bias) {
        this.jumping = jumping;
        this.distance = distance;
        this.tag = tag
        this.weight1 = weight1
        this.weight2 = weight2
        this.fitness = fitness
        this.bias = bias

    }
    add(ypos, tag) {
        add([
            rect(50, 50),
            color(WHITE),
            body({

            }),
            pos(200, ypos),
            area(),
            origin("center"),
            tag,
            "player"
       ]);

    }

    jump(tag) {
        var player = get(tag)
        if (player[0]&& player[0].pos.y >= 625 - 25 && !this.jumping) {
            this.jumping = true
            player[0].jump(700)
            wait(0.2, () => {
                this.jumping = false
            })
        } 

    }

    get_next_blockx(tag) {
        const obstancles = get("blocks")
        const player = get(tag)[0]

        if (obstancles[obstancles.length - 1] == undefined) {
            return 0
        } else {
            return obstancles[obstancles.length - 1].pos.x -  player.pos.x   
        }
        
    }

    get_next_blocky() {
        const obstancles = get("blocks")
        const player = get(this.tag)[0]
        if (obstancles[obstancles.length - 1] == undefined) {
            return 0
        } else {
            return obstancles[obstancles.length - 1].pos.y
        }
        
    }

}

export default Player;