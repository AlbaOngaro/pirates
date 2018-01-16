const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.035;
const REVERSE_POWER = 0.025;

function shipClass() {
    
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.turn_rate = 0.02;
    this.myCarPic;

    this.reset = function(whichImage) {
        
        this.myCarPic = whichImage;
        
        for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
                if(trackGrid[arrayIndex] == MAP_PLAYER_START) {
                    trackGrid[arrayIndex] = MAP_SEA;
                    this.ang = -Math.PI/2;
                    this.x = eachCol * TILE_W + TILE_W/2;
                    this.y = eachRow * TILE_H + TILE_H/2;
                    return;
                }
            }
        }
    }
    
    this.move = function() {
        
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.speed < 0.2) {
            this.turn_rate = 0.015;
        } else {
            this.turn_rate = 0.025;
        }

        if (keyHeld_TurnLeft) {
            this.ang -= this.turn_rate;
        }
        if (keyHeld_TurnRight) {
            this.ang += this.turn_rate;
        }
        if (keyHeld_reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (keyHeld_gas) {
            this.speed += DRIVE_POWER;
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed; 
        
        shipTrackHandling(this)
    }
    
    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic,this.x,this.y,this.ang);
    }
}