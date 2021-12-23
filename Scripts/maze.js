// Tile directions
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.paths = [];
    this.neighbours = [];
  }
}

class MazeGenerator {
  constructor(width, height) {

    this.width = width;
    this.height = height;
    this.tiles = [];

    for (let y in range(1, width)) {

      this.tiles.push([])

      for (let x in range(1, height)) {

        let tile = new Tile(x, y)
        if (y != 0) tile.neighbours.push(sumArrays([x, y].map(Number), UP)); // if there is a tile above
        if (x != width + 1) tile.neighbours.push(sumArrays([x, y].map(Number), RIGHT)); // if there is a tile to the right
        if (y != height - 1) tile.neighbours.push(sumArrays([x, y].map(Number), DOWN)); // if there is a tile below
        if (x != 0) tile.neighbours.push(sumArrays([x, y].map(Number), LEFT)); // if there is a tile to the left
      
        this.tiles[y][x] = tile
      }
    }
    const pivotX = Math.floor(this.width / 2) - 1
    const pivotY = Math.floor(this.height / 2) - 1
    let pivot = this.tiles[pivotY][pivotX]

    let queue = []

    queue.push([...pivot.neighbours])

    console.log(queue)

  }

  connectTiles(tile, target) {

  }

  getTile(x, y) {
    return this.tiles.get([x, y].map(Number))
  }
}

let maze = new MazeGenerator(6, 6)
console.log(maze.tiles)

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

function sumArrays(arr1, arr2) {
  return arr1.map((num, idx) => {
    return num + arr2[idx];
  })
}

function subtractArrays(arr1, arr2) {
  return arr1.map((num, idx) => {
    return num - arr2[idx]
  })
}