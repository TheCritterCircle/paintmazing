function getDirection(directionArr) {
  if (directionArr[0] < 0) return 'left';
  else if (directionArr[0] > 0) return 'right';
  else if (directionArr[1] < 0) return 'up';
  else if (directionArr[1] > 0) return 'down';
}

function generateMaze(height, width, maxPaths) {
  let gameMaze = new Maze(height, width);

  let connectedTiles = [];

  for (let i = 0; i < maxPaths; i++) {
    let maxPathLength = Math.floor(Math.random() * 9) + 12;


    let activeTile = gameMaze.randomTile;
    while (connectedTiles.indexOf(activeTile) != -1) {
      activeTile = gameMaze.randomTile;
    }

    for (let i = 0; i < maxPathLength; i++) {
      connectedTiles.push(activeTile);

      let tileNeighbours = gameMaze.getNeighbours(activeTile);

      for (let pathTile of connectedTiles) {
        let pathTileIndex = tileNeighbours.indexOf(pathTile);
        if (pathTileIndex != -1) tileNeighbours.splice(pathTileIndex, 1);
      }

      if (tileNeighbours.length == 0) break;

      let tileToConnect = tileNeighbours[Math.floor(Math.random() * tileNeighbours.length)];

      gameMaze.connectTiles(activeTile, tileToConnect);

      activeTile = tileToConnect;
    }

    connectedTiles.push(activeTile);
  }

  for (let row of gameMaze.tiles) {
    for (let tile of row) {
      let tileNeighbours = gameMaze.getNeighbours(tile);
      let randomNeighbourA = tileNeighbours[Math.floor(Math.random() * tileNeighbours.length)];
      let randomNeighbourB = tileNeighbours[Math.floor(Math.random() * tileNeighbours.length)];
      gameMaze.connectTiles(tile, randomNeighbourA);
      gameMaze.connectTiles(tile, randomNeighbourB);
    }
  }

  return gameMaze;
}

function drawMaze(maze) {
  let canvas = document.getElementById('gameCanvas');
  let ctx = canvas.getContext('2d');

  for (let x in maze.tiles) {
    for (let y in maze.tiles[x]) {
      let spriteNum = getTileSprite(maze.tiles[x][y]);
      let img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x * 30, y * 30);
      };
      img.src = `./Sprites/Tiles/${spriteNum}.png`;
    }
  }
}

function getTileSprite(tile) {
  let openSides = tile.openSides;
  return openSides['up'] + openSides['right'] * 2 + openSides['down'] * 4 + openSides['left'] * 8;
}