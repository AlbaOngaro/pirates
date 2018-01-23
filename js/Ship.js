const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.04;
const REVERSE_POWER = 0.025;
const ATTACK_RANGE = 50;
var isShooting = false;

function shipClass() {
    
    this.x = 75;
    this.y = 75;
    this.cropX = 0;
    this.ang = 0;
    this.speed = 0;
    this.turn_rate = 0.02;
    this.myShipPic;
    this.name ="Untitled car";

    this.attackAreaRadius = 130;
    this.damageAreaRadius = 15;
    this.areaColor = 'rgba( 255, 87, 51 ,0.5)';
    
    this.life = 100;
    this.fullLife = 60;
    
    this.myShot = new shotClass();
    
    this.keyHeld_gas = false;
    this.keyHeld_reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
    
    this.setupInput = function(upKey,rightKey,downKey,leftKey,shotKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
        this.controlKeyFire = shotKey;
    }
    
    this.reset = function(whichImage, shipName, playerTeam) {
        
        this.playerControlled = playerTeam;
        
        /// position player & enemy
        /// the player is positioned at the center of the canvas
        /// the enemy is randomly positioned
        if (this.playerControlled) {
            this.x = camPanX + canvas.width/2;
            this.y = camPanY + canvas.height/2;
        } else {
            this.x = Math.floor((Math.random() * (MAP_COLS*TILE_W-TILE_W)) + TILE_W);
            this.y = Math.floor((Math.random() * (MAP_ROWS*TILE_H-TILE_H)) + TILE_H);
        }
        
        this.name = shipName;
        this.myShipPic = whichImage;
        this.speed = 0;
        
    }
    
    this.cannonFire = function() { ////   
        if (this.myShot.isReadyToFire()) {
            this.myShot.shootFrom(this,30);
        }////
    } ////
    
    /// the target argument is used only for the enemy player
    this.move = function(target) {
        
        this.speed *= GROUNDSPEED_DECAY_MULT;

        //console.log(this.x);
        
        if (this.speed < 0.2) {
            this.turn_rate = 0.015;
        } else {
            this.turn_rate = 0.025;
        }
        
        //player movement logic
        if (this.playerControlled == true) {
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
        } 
        
        //enemy movment logic
        if (this.playerControlled == false) {
            
            this.ang = Math.atan2(target.y-this.y,target.x-this.x);
            this.speed += DRIVE_POWER/2.5; 
            
            if (target.x + target.attackAreaRadius > this.x &&
                target.x - target.attackAreaRadius < this.x &&
                target.y + target.attackAreaRadius > this.y &&
                target.y - target.attackAreaRadius < this.y) {
                this.speed = 0;
                this.cannonFire();
            } else {
                this.attack = false;
            }
        }
        
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed; 
        
        //ship collisions
        shipWorldHandling(this);
        
        
        if (this.life > 50) {
            this.lifeColor = "rgba(51, 204, 51, 0.7)"
        } else if (this.life <= 50 && this.life > 10) {
            this.lifeColor = "rgba(255, 102, 0,0.7)";
        } else if (this.life < 10) {
            this.lifeColor = "rgba(255, 0, 0, 0.7)";
        }
        
        this.myShot.move();
        
    }
    
    this.drawLife = function(){
        colorRect(this.x-(this.fullLife/2),this.y-30,this.fullLife,9,'#d1d1d1');
        colorRect(this.x-(this.fullLife/2),this.y-30,this.fullLife*(this.life/100),7,this.lifeColor);
        strokeRect(this.x-(this.fullLife/2),this.y-30,this.fullLife,9,'white',2);
    }
    
    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myShipPic,this.x,this.y,this.ang,this.cropX);
        this.drawLife();
        //function used for debugging purpose, this is the damage area
        //colorCircle(this.x,this.y,this.damageAreaRadius,this.areaColor);
        this.myShot.draw();
    }
    
}