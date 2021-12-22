const directions = ["UP", "RIGHT", "DOWN", "LEFT"]

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.paths = new Set();
    this.neighbours = new Set();
  }
}

class MazeGenerator {
  constructor(width, height) {

    this.width = width;
    this.height = height;
    this.tiles = new Map();

    for (let x in range(1, width)) {
      for (let y in range(1, height)) {
        let pos = [x, y].map(Number)
        console.log(pos)
        this.tiles.set(pos, new Tile(x, y))

        let tile = this.tiles.get(pos)
        console.log(this.tiles)
        console.log(tile)

        if (x != 0) tile.neighbours.add([pos[0] - 1, pos[1]]);
        if (x != width - 1) tile.neighbours.add([pos[0] + 1, pos[1]]);
        if (y != 0) tile.neighbours.add([pos[0], pos[1] - 1]);
        if (y != height - 1) tile.neighbours.add([pos[0], pos[1] + 1]);
      }
    }
    
    let pivot = [
      Math.floor(width / 2),
      Math.floor(height / 2)
    ];


  }
}

let maze = new MazeGenerator(3, 3)
console.log(maze.tiles)

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}