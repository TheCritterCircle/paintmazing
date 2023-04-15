function getDirection(directionArr) {
  if (directionArr[0] < 0) return 'left';
  else if (directionArr[0] > 0) return 'right';
  else if (directionArr[1] < 0) return 'up';
  else if (directionArr[1] > 0) return 'down';
}

function generateMaze(height, width) {
  return new Maze(height, width);
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