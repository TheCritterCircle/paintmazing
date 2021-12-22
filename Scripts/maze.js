const DIRECTIONS = new Array([
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0] // left
])

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

        let tile = new Tile(x, y)

        if (x != 0) tile.neighbours.add([pos[0] - 1, pos[1]]);
        if (x != width - 1) tile.neighbours.add([pos[0] + 1, pos[1]]);
        if (y != 0) tile.neighbours.add([pos[0], pos[1] - 1]);
        if (y != height - 1) tile.neighbours.add([pos[0], pos[1] + 1]);
      
        this.tiles.set(pos, tile)
      }
    }
    console.log(this.tiles)
    let pivot = this.tiles.get([
      Math.floor(this.width / 2),
      Math.floor(this.height / 2)
    ]);
    console.log(pivot)
    let queue = new Array()

    queue.push(...pivot.neighbours)

  }

  connectTiles(tile, target) {

  }

  getTile([x, y]) {
    return this.tiles.get([x, y].map(Number))
  }
}

let maze = new MazeGenerator(6, 6)
console.log(maze.tiles)

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}