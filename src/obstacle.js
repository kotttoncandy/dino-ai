class Obstacle {
    constructor(height, ypos, block) {
        this.height = height
        this.ypos = ypos
    }
    add_obj() {
        this.block = add([
            rect(50, 5000),
            pos(800, this.ypos),
            move(LEFT, 700),
            area(),
            "blocks"

        ])

        setTimeout(() => {
            this.block.destroy()
        }, 30000)
    }
}

export default Obstacle