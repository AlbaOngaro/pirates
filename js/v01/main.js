var canvas, canvasContext;

var redShip = new shipClass();
var greenShip = new shipClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    
    colorRect(0,0,canvas.width,canvas.height,'black');
    colorText('LOADING',canvas.width/2,canvas.height/2,'white');
    
    loadImages();
}

function startGame() {
    
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
    
    SetupInput();
    
    loadLevel(levelOne);
}

function loadLevel(whichLevel){
    worldGrid = whichLevel.slice();
    greenShip.reset(greenShipPic,"Green Sapphire");
	redShip.reset(shipPic,"Ruby");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
    greenShip.move();
	redShip.move();
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function drawAll() {
	clearScreen();
	drawWorld();
    greenShip.draw();
    redShip.draw();
}