import kaboom from 'kaboom';
import Player from './player.js';
import Obstacle from './obstacle.js'
import {amIjumping} from './ai.js'
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

var best_fitness = 0
var best_weight1 = 1
var best_weight2 = -1
var best_bias = 200
kaboom({
    height: 720,
    width: 900,
    background: (255, 255, 255)
});

scene("main", () => {

    var players = []

    document.getElementById("best").innerHTML = String(best_weight1) + " ; " + String(best_weight2)
    document.getElementById("current").innerHTML = best_bias
    document.getElementById("fitness").innerHTML = best_fitness

    var obj_inter = setInterval(() => {
        var obstacle1 = new Obstacle
        obstacle1.ypos = Math.random() * ((565) - (620)) + (580)
        obstacle1.add_obj()
        // 1200
    }, 1200)

    add([
        rect(10000000, 100),
        pos(0, 650),
        color(rgb(200, 200, 200)),
        solid(),
        area(),
        "floor"
    ]);

    for(let current_player=0; current_player < 10; current_player++) {
        players.push(new Player)
        players[current_player].tag = makeid(5)
        players[current_player].fitness = 0
        players[current_player].weight1 = Math.random() * ((best_weight1 + 4) - (best_weight1 - 2)) + (best_weight1 - 2)
        players[current_player].weight2 = Math.random() * ((best_weight2 + 4) - (best_weight2 - 2)) + (best_weight2 - 2)
        players[current_player].bias = Math.random() * ((best_bias + 100) - (best_bias - 100)) + (best_bias - 100)

    }

    for(let idx=0; idx < players.length; idx++) {
        players[idx].add(600, players[idx].tag)

    }
  
    onUpdate(() => {
        for (let pl=0; pl <  players.length; pl++) {
            if (amIjumping(players[pl].get_next_blockx(), players[pl].get_next_blocky(), players[pl].weight1, players[pl].weight2, players[pl].bias)) {
                players[pl].jump(players[pl].tag)
            } 

            players[pl].fitness += 1
            
        }
    })
    onCollide("player", "blocks", (e,a) => {
        e.destroy()
        var current_best_weight1 = best_weight1
        var current_best_weight2 = best_weight2
        var current_best_fitness = best_fitness
        var current_best_bias = best_bias

        if(get("player").length == 0) {
            clearInterval(obj_inter)
            for (let i=0; i< players.length; i++) {

                every("player", destroy)
                if(i == 0) {
                    if (best_fitness < players[i].fitness) {
                        current_best_weight1 = players[i].weight1
                        current_best_weight2 = players[i].weight2
                        current_best_fitness = players[i].fitness
                        current_best_bias = players[i].bias      

                    }

                } else {
                    if (current_best_fitness < players[i].fitness) {
                        if (best_fitness < players[i].fitness) {
                            current_best_weight1 = players[i].weight1
                            current_best_weight2 = players[i].weight2
                            current_best_fitness = players[i].fitness      
                            current_best_bias = players[i].bias      

                        } 

                    }
                }
            }
            best_bias = current_best_bias

            best_fitness = current_best_fitness  
            best_weight1 = current_best_weight1
            best_weight2 = current_best_weight2
            go('main')

        }

    }) 
})

go('main')
