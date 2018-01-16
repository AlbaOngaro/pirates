var shipX = 75;
var shipY = 75;
var shipAng = 0;
var shipSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.05;
const REVERSE_POWER = 0.03;
const TURN_RATE = 0.03;

function shipReset() {
	for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == MAP_PLAYER_START) {
				trackGrid[arrayIndex] = MAP_SEA;
                shipAng = -Math.PI/2;
				shipX = eachCol * MAP_W + MAP_W/2;
				shipY = eachRow * MAP_H + MAP_H/2;
			}
		}
	}
}

function shipMove() {
	 
    shipSpeed *= GROUNDSPEED_DECAY_MULT;
    
    if (keyHeld_TurnLeft) {
        shipAng -= TURN_RATE;
    }
    if (keyHeld_TurnRight) {
        shipAng += TURN_RATE;
    }
    if (keyHeld_reverse) {
        shipSpeed -= REVERSE_POWER;
    }
    if (keyHeld_gas) {
        shipSpeed += DRIVE_POWER;
    }
    
    shipX += Math.cos(shipAng) * shipSpeed;
	shipY += Math.sin(shipAng) * shipSpeed; 
}

function shipDraw () {
    drawBitmapCenteredWithRotation(shipPic,shipX,shipY,shipAng);
}