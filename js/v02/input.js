const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function SetupInput () {
    canvas.addEventListener('mousemove', updateMousePos);
    
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);

    redShip.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keySet(keyEvent, whichCar, setTo) {
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    } 
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    } 
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_reverse = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_gas = setTo;
    }
}

function keyPressed(evt) {
    //console.log("key pressed: "+evt.keyCode);
    //keySet(evt,greenShip, true);
    keySet(evt,redShip, true);
    evt.preventDefault();
}

function keyReleased(evt) {
    //keySet(evt,greenShip, false);
    keySet(evt,redShip, false);
}
