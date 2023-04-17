var gameCanvas = document.getElementById('gameCanvas');
var ctx = gameCanvas.getContext('2d');

let gameMaze = generateMaze(8, 8, 3);
drawMaze(gameMaze);

loadScene(titleScreen);