const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

function getDirection(pos) {
  if (pos[0] == 0 && pos[1] == -1) return UP;
  else if (pos[0] == 1 && pos[1] == 0) return RIGHT;
  else if (pos[0] == 0 && pos[1] == 1) return DOWN;
  else if (pos[0] == -1 && pos[1] == 0) return LEFT;
  console.error('Incorrect direction given:', pos);
}

class Tile {
  openSides = [false, false, false, false];

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
    for (let x = 0; x < this.width - 1; x++) {
      this.tiles.push([]);
      for (let y = 0; y < this.height - 1; y++) {
        this.tiles[x].push(new Tile()); 
      }
    }
  }

  connectTiles(aX, aY, bX, bY) {
    this.tiles[aX][aY].openSide(getDirection([bX - aX, bY - aY]));
    this.tiles[bX][bY].openSide(getDirection([aX - bX, aY - bY]));
  }
}