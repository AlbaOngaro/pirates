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
    this.name ="Untitled car";
    
    this.keyHeld_gas = false;
    this.keyHeld_reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
    
    this.setupInput = function(upKey,rightKey,downKey,leftKey) {
        
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
        
    }

    this.reset = function(whichImage, shipName) {
        
        this.name = shipName;
        this.myCarPic = whichImage;
        this.speed = 0;
        
        for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
                if(worldGrid[arrayIndex] == MAP_PLAYER_START) {
                    worldGrid[arrayIndex] = MAP_SEA;
                    this.ang = -Math.PI/2;
                    this.x = eachCol * TILE_W + TILE_W/2;
                    this.y = eachRow * TILE_H + TILE_H/2;
                    return;
                }
            }
        }
        
        console.log("no player start found!");
    }
    
    this.move = function() {
        
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.speed < 0.2) {
            this.turn_rate = 0.015;
        } else {
            this.turn_rate = 0.025;
        }

        if (this.keyHeld_TurnLeft) {
            this.ang -= this.turn_rate;
        }
        if (this.keyHeld_TurnRight) {
            this.ang += this.turn_rate;
        }
        if (this.keyHeld_reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (this.keyHeld_gas) {
            this.speed += DRIVE_POWER;
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed; 
        
        shipWorldHandling(this)
    }
    
    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic,this.x,this.y,this.ang);
    }
}