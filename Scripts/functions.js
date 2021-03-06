function createImage(src) {
  let img = new Image();
  img.src = src;
  return img
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

function draw(img, x, y) {
  if (img.complete) {
    ctx.drawImage(img, x, y)
  } else {
    img.onload = () => {
      ctx.drawImage(img, x, y);
    };
  }
}

function findNeighbours(tile, maze) {

  if (tile.y != 0) tile.neighbours.push(sumArrays(tile.pos, UP)); // if there is a tile above
  if (tile.x != maze.width - 1) tile.neighbours.push(sumArrays(tile.pos, RIGHT)); // if there is a tile to the right
  if (tile.y != maze.height - 1) tile.neighbours.push(sumArrays(tile.pos, DOWN)); // if there is a tile below
  if (tile.x != 0) tile.neighbours.push(sumArrays(tile.pos, LEFT)); // if there is a tile to the left

  return tile;
}

function renderMaze(maze) {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (y in maze.tiles) {
    for (x in maze.tiles[y]) {
      let n = 0;
      if (maze.tiles[y][x].paths.findIndex(a => arraysEqual(a, TILE_UP)) !== -1) n += 1;
      if (maze.tiles[y][x].paths.findIndex(a => arraysEqual(a, TILE_RIGHT)) !== -1) n += 2;
      if (maze.tiles[y][x].paths.findIndex(a => arraysEqual(a, TILE_DOWN)) !== -1) n += 4;
      if (maze.tiles[y][x].paths.findIndex(a => arraysEqual(a, TILE_LEFT)) !== -1) n += 8;

      draw(TILE_IMG(n), x * TILE_DIM[0], y * TILE_DIM[1]);
    }
  }
}