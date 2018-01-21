// shot tuning constants
const SHOT_SPEED = 6.5;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass() {
    
    this.shotSide = "right";
    
    this.reset = function() {
        this.shotLife = 0;
    }
    this.isReadyToFire = function() {
        return (this.shotLife <= 0);
    }
    this.shootFrom = function(shipFiring) {
        this.x = shipFiring.x;
        this.y = shipFiring.y;
        
        if (this.shotSide == "right") {
            this.xv = Math.cos(shipFiring.ang+1.5) * SHOT_SPEED;
            this.yv = Math.sin(shipFiring.ang+1.5) * SHOT_SPEED;
        } else if (this.shotSide == "left") {
            this.xv = Math.cos(shipFiring.ang-1.5) * SHOT_SPEED;
            this.yv = Math.sin(shipFiring.ang-1.5) * SHOT_SPEED;
        } else if (this.shotSide == "front") {
            this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED;
        this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED;
        }
        
        
        
        this.shotLife = SHOT_LIFE;
    }
    this.move = function() {
        if (this.shotLife > 0) {
            this.shotLife--;
            this.x += this.xv;
            this.y += this.yv;
        }
    }

    this.draw = function() {
        if (this.shotLife > 0) {
            //5 is half the width and height of the cannon ball image to center it
            canvasContext.drawImage(shotPic, this.x-5, this.y-5);
        }
    }

} // end of class