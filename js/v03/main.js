var canvas, canvasContext;

var p1 = new shipClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    
    colorRect(0,0,canvas.width,canvas.height,'black');
    colorText('LOADING',canvas.width/2,canvas.height/2,'white');
    
    loadImages();
    sliderReset();
}

function startGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
    SetupInput();
    loadLevel(levelOne);
}

function loadLevel(whichLevel){
    worldGrid = whichLevel.slice();
	p1.reset(shipPic,"Ruby");
    p1.myShot.reset();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	p1.move();
    sliderMove();
    cameraFollow();
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function drawAll() {
	clearScreen();
    canvasContext.save();
    canvasContext.translate(-camPanX,-camPanY);
	drawWorld();
    p1.draw();
    canvasContext.restore();
}