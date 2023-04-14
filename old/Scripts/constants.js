//const TILE_UP = [0, -1];
//const TILE_RIGHT = [1, 0];
//const TILE_DOWN = [0, 1];
//const TILE_LEFT = [-1, 0];

const canvas = document.getElementById('gameCanvas');
const ctx = document.getElementById('gameCanvas').getContext('2d');

const TILE_DIMENSIONS = {
  width: 30,
  height: 30
};
//const TILE_IMG = (n) => { 
//  return createImage("./Sprites/Tiles/"+  n.toString() + ".png")
//};

//const SETTINGS = {
//  movement: {
//    speed: { // some placeholder data
//      x: 100,
//      y: 100
//    },
//    slipperiness: 0.5 // 0: ball stops immediately - 1: ball doesn't stop
//  }
//};