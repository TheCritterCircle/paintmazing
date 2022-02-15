const TILE_UP = [0, -1];
const TILE_RIGHT = [1, 0];
const TILE_DOWN = [0, 1];
const TILE_LEFT = [-1, 0];

const canvas = document.getElementById("gameCanvas");
const ctx = document.getElementById('gameCanvas').getContext('2d');

const TILE_DIM = [30, 30]
const TILE_IMG = (n) => { 
  return createImage("./Sprites/Tiles/"+  n.toString() + ".png")
};