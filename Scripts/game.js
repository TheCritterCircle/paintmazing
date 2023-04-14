

function drawMaze(maze) {
  let canvas = document.getElementById('gameCanvas');
  let ctx = canvas.getContext('2d');

  for (let x in maze.tiles) {
    for (let y in maze.tiles[x]) {
      spriteNum = getTileSprite(maze.tiles[x][y]);
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
  // [true, false, true, true] becomes 13, and thus uses tile sprite #13
  return openSides[0] + openSides[1] * 2 + openSides[2] * 4 + openSides[3] * 8;
}

gameMaze = new Maze(10, 10);
drawMaze(gameMaze);