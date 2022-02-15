class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pos = [x, y].map(Number);

    this.neighbours = [];
    this.paths = [];
    this.isPathed = false;
  }
}

class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.generateTiles()
    this.generatePaths()
  }

  getTile(x, y) {
    return this.tiles[y][x]
  }

  findNeighbours(tile) {
    if (tile.y != 0) tile.neighbours.push(sumArrays(tile.pos, TILE_UP));
    if (tile.x != this.width - 1) tile.neighbours.push(sumArrays(tile.pos, TILE_RIGHT)); 
    if (tile.y != this.height - 1) tile.neighbours.push(sumArrays(tile.pos, TILE_DOWN)); 
    if (tile.x != 0) tile.neighbours.push(sumArrays(tile.pos, TILE_LEFT));
    return tile;
  }

  pathTiles(tile, targetTile) {
    if (tile.paths.indexOf(targetTile) !== -1) return console.log("error: tile already pathed - this shouldn't happen");
  
    tile.paths.push(subtractArrays(targetTile.pos, tile.pos))
    targetTile.paths.push(subtractArrays(tile.pos, targetTile.pos))
  }

  generateTiles() {
    this.tiles = [];

    for (const y in range(1, this.height)) {
      this.tiles[y] = [];
      
      for (const x in range(1, this.width)) {
        let tile = new Tile(x, y);
        tile = this.findNeighbours(tile);
        this.tiles[y][x] = tile;
      }
    }
  }

  generatePaths() {
    const midWidth = Math.floor(this.width / 2);
    const midHeight = Math.floor(this.height / 2);

    let midTile = this.getTile(midWidth, midHeight);
    let queue = [];

    midTile.isPathed = true;

    // add tiles around the middle to the queue
    for (const t in midTile.neighbours) {
      let tilePos = midTile.neighbours[t];
      let targetTile = this.getTile(tilePos[0], tilePos[1]);
      
      queue.push(targetTile);
    }

    // run the queue
    while (queue.length > 0) {
      let randomIndex = Math.floor(Math.random() * queue.length)

      let extraConnection = Math.floor(Math.random() * 5) === 0
      let possibleExtras = []

      let tile = queue[randomIndex];
      let options = [];
  
      tile.neighbours.forEach(nPos => {
  
        let neighbour = this.getTile(nPos[0], nPos[1]) // get the neighbouring tile
  
        if (neighbour.isPathed) options.push(neighbour) // if the neighbour is pathed to a tile already, add it to the possible path list (options)
        else if (queue.indexOf(neighbour) === -1) queue.push(neighbour) // if it's not pathed, check if the neighbour is already in the queue and if not, add it
  
        if (extraConnection) possibleExtras.push(neighbour)

      })
      let randomOption = Math.floor(Math.random() * options.length);
      this.pathTiles(tile, options[randomOption])

      if (possibleExtras.length > 0) {
        let randomExtra = Math.floor(Math.random() * possibleExtras.length);
        this.pathTiles(tile, possibleExtras[randomExtra])
      }

      tile.isPathed = true
      queue.splice(randomIndex, 1);
    }
  }
}

class Sprite {
  constructor(x, y, img, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || img.width;
    this.height = height || img.height;

    this.img = img;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Ball extends Sprite {
  constructor(x, y, img, width, height, speed) {
    // ...
  }
}