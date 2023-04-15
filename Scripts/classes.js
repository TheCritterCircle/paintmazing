
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  openSides = {
    'up': false,
    'right': false,
    'down': false,
    'left': false
  };

  openSide(direction) {
    this.openSides[direction] = true;
  }
}

class Maze {
  tiles = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.generateTiles();
  }

  generateTiles() {
    for (let x = 0; x < this.width; x++) {
      this.tiles.push([]);
      for (let y = 0; y < this.height; y++) {
        this.tiles[x].push(new Tile(x, y)); 
      }
    }
  }

  getTile([x, y]) {
    return this.tiles[x][y];
  }

  connectTiles(tileA, tileB) {
    tileA.openSide(getDirection([tileB.x - tileA.x, tileB.y - tileA.y]));
    tileB.openSide(getDirection([tileA.x - tileB.x, tileA.y - tileB.y]));
  }

  generatePath() {
    // 7 to 15
    let maxPathLength = Math.floor(Math.random() * 9) + 6;

    let pathTiles = [];

    let activeTile = this.randomTile;

    for (let i = 0; i < maxPathLength; i++) {
      pathTiles.push(activeTile);

      let tileNeighbours = this.getNeighbours(activeTile);

      for (let pathTile of pathTiles) {
        let pathTileIndex = tileNeighbours.indexOf(pathTile);
        if (pathTileIndex != -1) tileNeighbours.splice(pathTileIndex, 1);
      }

      if (tileNeighbours.length == 0) break;

      let tileToConnect = tileNeighbours[Math.floor(Math.random() * tileNeighbours.length)];

      this.connectTiles(activeTile, tileToConnect);

      activeTile = tileToConnect;
    }

  }

  get randomTile() {
    return this.tiles[
      Math.floor(Math.random() * this.width)
    ][
      Math.floor(Math.random() * this.height)
    ];
  }

  getNeighbours(tile) {
    let neighbours = [];

    if (tile.x != 0) neighbours.push(this.getTile([tile.x - 1, tile.y]));
    if (tile.x < this.width - 1) neighbours.push(this.getTile([tile.x + 1, tile.y]));
    if (tile.y != 0) neighbours.push(this.getTile([tile.x, tile.y - 1]));
    if (tile.y < this.height - 1) neighbours.push(this.getTile([tile.x, tile.y + 1]));

    return neighbours;
  }
}
