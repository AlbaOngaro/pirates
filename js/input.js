const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACEBAR = 32;
const KEY_Y = 89;
const KEY_N = 78;

var mouseX = 0;
var mouseY = 0;

function SetupInput () {
    canvas.addEventListener('mousemove', updateMousePos);
    
    document.addEventListener('keydown',keyPressed);
    document.addEventListener('keyup',keyReleased);

    p1.setupInput(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SPACEBAR, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keySet(keyEvent, whichShip, setTo) {
    if (keyEvent.keyCode == whichShip.controlKeyLeft) {
        whichShip.keyHeld_TurnLeft = setTo;
    } 
    if (keyEvent.keyCode == whichShip.controlKeyRight) {
        whichShip.keyHeld_TurnRight = setTo;
    } 
    if (keyEvent.keyCode == whichShip.controlKeyDown) {
        whichShip.keyHeld_reverse = setTo;
    }
    if (keyEvent.keyCode == whichShip.controlKeyUp) {
        whichShip.keyHeld_gas = setTo;
    }
    if (keyEvent.keyCode == whichShip.aimKeyLeft) {
        whichShip.keyHeld_AimLeft = setTo;
    }
    if (keyEvent.keyCode == whichShip.aimKeyRight) {
        whichShip.keyHeld_AimRight = setTo;
    }
}

function keyPressed(evt) {
    
    //console.log(evt.keyCode);
    
    if (evt.keyCode == p1.controlKeyFire) {
        p1.cannonFire();
    }
    
    keySet(evt, p1, true);
    
    evt.preventDefault();
}

function keyReleased(evt) {
    keySet(evt, p1, false);
}
