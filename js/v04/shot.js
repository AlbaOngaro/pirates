// shot tuning constants
const SHOT_SPEED = 6.5;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

function shotClass() {
    
    this.shotSide = "right";
    this.target;
    
    this.reset = function(side,target) {
        this.shotLife = 0;
        this.shotSide = side;
        this.target = target;
    }
    
    this.isReadyToFire = function() {
        return (this.shotLife <= 0);
    }
    
    this.shootFrom = function(shipFiring, shot_life) {
        
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
        
        this.shotLife = shot_life;
    }
    
    this.move = function() {
        if (this.shotLife > 0) {
            this.shotLife--;
            this.x += this.xv;
            this.y += this.yv;
        } else {
            this.x = undefined;
            this.y = undefined;
        } 
        
        if (this.target.x + this.target.damageAreaRadius > this.x &&
            this.target.x - this.target.damageAreaRadius < this.x &&
            this.target.y + this.target.damageAreaRadius > this.y &&
            this.target.y - this.target.damageAreaRadius < this.y) {
            
            lastShotX = this.x;
            lastShotY = this.y;
            
            this.shotLife = 0;

            hit = true;
            frameIndex = 0;
            if (this.target.life > 0) {
                this.target.life -= 5;
            } 
            
            if (this.target.life <= 30) {
                this.target.cropX = 50;
            }
        }
    }

    this.draw = function() {
        if (this.shotLife > 0) {
            //5 is half the width and height of the cannon ball image to center it
            canvasContext.drawImage(shotPic, this.x-5, this.y-5);
        }
    }

} // end of class