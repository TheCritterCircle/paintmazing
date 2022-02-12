// Tile directions
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

const ctx = document.getElementById('gameCanvas').getContext('2d');

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = [x, y].map(Number);

    this.neighbours = []; // position [x, y] of tiles next to this one
    this.connections = []; // the directions of the connected tiles
    this.isConnected = false; // has at least 1 connection
  };
};

class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.tiles = [];
  }
}

function generateMaze() {
  const width = Number(document.getElementById("mazeXInput").value);
  const height = Number(document.getElementById("mazeYInput").value);
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerHTML = '';

  if (width !== Math.abs(width) || width !== Math.floor(width) || width === 0) return errorMessage.innerHTML = 'Numbers may not be negative, zero, or have decimals.';
  if (height !== Math.abs(height) || height !== Math.floor(height) || height === 0) return errorMessage.innerHTML = 'Numbers may not be negative, zero, or have decimals.';
  
  let maze = new Maze(width, height);

  maze = generateTiles(maze);
  maze = generatePaths(maze);
  renderMaze(maze);
}

function generateTiles(maze) {
  for (y in range(1, maze.height)) {

    maze.tiles[y] = [];

    for (x in range(1, maze.width)) {

      let tile = new Tile(x, y);
      tile = findNeighbours(tile, maze);

      maze.tiles[y][x] = tile;
    }
  }

  return maze;
}

function generatePaths(maze) {
  let midTile = getTile(Math.floor(maze.width / 2), Math.floor(maze.height / 2), maze);
  let queue = [];

  midTile.isConnected = true;

  for (t in midTile.neighbours) {
    let tilePos = midTile.neighbours[t];
    let targetTile = getTile(tilePos[0], tilePos[1], maze);

    queue.push(targetTile);
  }

  while (queue.length > 0) {
    let tile = queue[0];
    let options = [];

    tile.neighbours.forEach(nPos => {

      let neighbour = getTile(nPos[0], nPos[1], maze) // get the neighbouring tile

      if (neighbour.isConnected) options.push(neighbour) // if the neighbour is connected to a tile already, add it to the possible connections list (options)
      else if (queue.indexOf(neighbour) === -1) queue.push(neighbour) // if it's not connected, check if the neighbour is already in the queue and if not, add it

    })
    let randomOption = Math.floor(Math.random() * options.length);
    connectTiles(tile, options[randomOption], maze)

    tile.isConnected = true
    queue.shift();
  }
  return maze;
}

function findNeighbours(tile, maze) {

  if (tile.y != 0) tile.neighbours.push(sumArrays(tile.pos, UP)); // if there is a tile above
  if (tile.x != maze.width - 1) tile.neighbours.push(sumArrays(tile.pos, RIGHT)); // if there is a tile to the right
  if (tile.y != maze.height - 1) tile.neighbours.push(sumArrays(tile.pos, DOWN)); // if there is a tile below
  if (tile.x != 0) tile.neighbours.push(sumArrays(tile.pos, LEFT)); // if there is a tile to the left

  return tile;
}

function getTile(x, y, maze) {
  return maze.tiles[y][x];
}

function connectTiles(tile, targetTile) {
  if (tile.connections.indexOf(targetTile) !== -1) return console.log("tile already connected - this shouldn't happen");

  tile.connections.push(subtractArrays(targetTile.pos, tile.pos))
  targetTile.connections.push(subtractArrays(tile.pos, targetTile.pos))
}

function renderMaze(maze) {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (y in maze.tiles) {
    for (x in maze.tiles[y]) {
      let n = 0;

      if (maze.tiles[y][x].connections.findIndex(a => arraysEqual(a, UP)) !== -1) n += 1;
      if (maze.tiles[y][x].connections.findIndex(a => arraysEqual(a, RIGHT)) !== -1) n += 2;
      if (maze.tiles[y][x].connections.findIndex(a => arraysEqual(a, DOWN)) !== -1) n += 4;
      if (maze.tiles[y][x].connections.findIndex(a => arraysEqual(a, LEFT)) !== -1) n += 8;

      const img = "./Sprites/Tiles/" + n.toString() + ".png";

      draw(img, x * 30, y * 30);
    }
  }
}

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
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
  img.src = file;
}