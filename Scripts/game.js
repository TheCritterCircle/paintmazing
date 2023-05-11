/*var gameCanvas = document.getElementById('gameCanvas');
var ctx = gameCanvas.getContext('2d');

let gameMaze = generateMaze(8, 8, 3);
drawMaze(gameMaze);

loadScene(titleScreen);*/

loadScene();

function loadScene() {
  let stage = new createjs.Stage('gameCanvas');

  let background = new createjs.Shape();
  background.graphics.beginLinearGradientFill(['#935F36', '#432917'], [0, 1], 0, 0, 0, 800)
    .drawRect(0, 0, 360, 800);

  let playButton = new createjs.Shape();
  playButton.graphics.beginFill('white')
    .drawRect(35, 450, 290, 80)
    .drawRect(35, 550, 290, 80);

  stage.addChild(background);
  stage.addChild(playButton);

  stage.update();
}