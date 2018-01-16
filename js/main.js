var canvas, canvasContext;

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
	shipReset();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	shipMove();
	shipTrackHandling();
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function drawAll() {
	clearScreen();
	drawTracks();
    shipDraw();
}