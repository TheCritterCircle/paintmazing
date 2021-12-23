// Tile directions
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = [x, y].map(Number);

    this.neighbours = []; // all tiles next to this one
    this.connections = []; // the connected neighbouring tiles
    this.directions = []; // the directions of the connected tiles (used for rendering)
    this.isActive = false; // has at least 1 connection
  };
};

class MazeGenerator {
  constructor(width, height) {

    this.width = width;
    this.height = height;
    this.tiles = [];

    // Generating tiles and finding neighbours
    for (let y in range(1, width)) {

      this.tiles.push([]);

      for (let x in range(1, height)) {

        let tile = new Tile(x, y);
        if (y != 0) tile.neighbours.push(sumArrays(tile.pos, UP)); // if there is a tile above
        if (x != width - 1) tile.neighbours.push(sumArrays(tile.pos, RIGHT)); // if there is a tile to the right
        if (y != height - 1) tile.neighbours.push(sumArrays(tile.pos, DOWN)); // if there is a tile below
        if (x != 0) tile.neighbours.push(sumArrays(tile.pos, LEFT)); // if there is a tile to the left
      
        this.tiles[y][x] = tile;
      };
    };

    // Locating pivot (middle tile)
    const pivotX = Math.floor(this.width / 2) - 1;
    const pivotY = Math.floor(this.height / 2) - 1;
    let pivot = this.tiles[pivotY][pivotX];

    let connectQueue = [];

    connectQueue.push(...pivot.neighbours);

    pivot.neighbours.forEach(t => {
      this.connectTiles(pivot, this.getTile(t));
    });
    pivot.isActive = true;

    while (connectQueue.length > 0) {

      let currentTile = this.getTile(connectQueue[0]);
      currentTile.isActive = true;
      connectQueue.shift();

      let connectedTiles = [];
      currentTile.neighbours.forEach(t => {
        let u = this.getTile(t);
        u.isActive ? connectedTiles.push(u) : connectQueue.push(t);
      });
      let randomTileNumber = Math.floor(Math.random(0, connectedTiles.length - 1));
      this.connectTiles(currentTile, connectedTiles[randomTileNumber]);
    };
  };

  connectTiles(tile, target) {
    if (tile.connections.indexOf(target) !== -1) return;
    // Add connections
    tile.connections.push(target);
    target.connections.push(tile);
    // Add directions
    tile.directions.push(subtractArrays(target.pos, tile.pos));
    target.directions.push(subtractArrays(tile.pos, target.pos));
  };

  getTile([x, y]) {
    return this.tiles[y][x];
  };
};

let maze = new MazeGenerator(6, 6);
renderMaze(maze);

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
};

function sumArrays(arr1, arr2) {
  return arr1.map((num, idx) => {
    return num + arr2[idx];
  });
};

function subtractArrays(arr1, arr2) {
  return arr1.map((num, idx) => {
    return num - arr2[idx];
  });
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function draw(file, x, y) {
  const ctx = document.getElementById('gameCanvas').getContext('2d');
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
  img.src = file;
}

function renderMaze(maze) {
  let remainingTiles = maze.tiles;
  for (y in remainingTiles) {
    for (x in remainingTiles[y]) {
      let n = 0;
      let img = "./Sprites/Tiles/";
      if (remainingTiles[y][x].directions.findIndex(a => arraysEqual(a, UP)) !== -1) n += 1;
      if (remainingTiles[y][x].directions.findIndex(a => arraysEqual(a, RIGHT)) !== -1) n += 2;
      if (remainingTiles[y][x].directions.findIndex(a => arraysEqual(a, DOWN)) !== -1) n += 4;
      if (remainingTiles[y][x].directions.findIndex(a => arraysEqual(a, LEFT)) !== -1) n += 8;
      img += n.toString() + ".png";
      draw(img, x * 30, y * 30);
    }
  }
}