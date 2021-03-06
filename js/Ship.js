const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.04;
const REVERSE_POWER = 0.025;
const ATTACK_RANGE = 50;
var isShooting = false;
var circle = {radius:40, angle:0};
var ball = {x:0, y:0,speed:0,ang:0};

function shipClass() {
    
    this.x = 75;
    this.y = 75;
    this.cropX = 0;
    this.ang = 0;
    this.speed = 0;
    this.turn_rate = 0.02;
    this.myShipPic;
    this.name ="Untitled car";

    this.inSightArea = 200;
    this.attackAreaRadius = 130;
    this.damageAreaRadius = 15;
    this.areaColor = 'rgba( 255, 87, 51 ,0.5)';
    
    this.life = 100;
    this.fullLife = 60;
    
    this.myShot = new shotClass();
    this.aimDir = 0;
    
    this.keyHeld_gas = false;
    this.keyHeld_reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    
    this.keyHeld_AimRight = false;
    this.keyHeld_AimLeft = false;
    
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
    this.aimKeyLeft;
    this.aimKeyRight;
    
    this.setupInput = function(upKey,rightKey,downKey,leftKey,shotKey,aimLeftKey,aimRightKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
        
        this.controlKeyFire = shotKey;
    
        this.aimKeyLeft = aimLeftKey;
        this.aimKeyRight = aimRightKey;
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
            this.x = Math.floor((Math.random() * canvas.width/3) + canvas.width);
            this.y = Math.floor((Math.random() * canvas.height/3) + canvas.height);
        }
        
        this.name = shipName;
        this.myShipPic = whichImage;
        this.speed = 0;
        
        this.randomX = Math.floor((Math.random() * (MAP_COLS*TILE_W)-TILE_W) + TILE_W);
        this.randomY = Math.floor((Math.random() * (MAP_ROWS*TILE_H)-TILE_H) + TILE_H);
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
            
            if (this.keyHeld_AimLeft) {
                ball.speed = -0.1;
                ball.ang -= 0.1;
            } else if (this.keyHeld_AimRight) {
                ball.speed = 0.1;
                ball.ang += 0.1;
            } else {
                ball.speed = 0;
            }
        } 
        
        //enemy movment logic
        if (this.playerControlled == false) {
            
            if (target.x + target.inSightArea > this.x &&
                target.x - target.inSightArea < this.x &&
                target.y + target.inSightArea > this.y &&
                target.y - target.inSightArea < this.y) {
               
                this.ang = Math.atan2(target.y-this.y,target.x-this.x);
            } else {
                
                
                if (Math.floor(this.x) == this.randomX || Math.floor(this.y) == this.randomY || this.speed < 0.1) {
                    this.randomX = Math.floor((Math.random() * 1135) + 65);
                    this.randomY = Math.floor((Math.random() * 845) + 65);
                }
                
                
                this.ang = Math.atan2(this.randomY-this.y,this.randomX-this.x);
            
            }
            
            this.speed += Math.random() * DRIVE_POWER;
            console.log(this.speed);
            
            if (target.x + target.attackAreaRadius > this.x &&
                target.x - target.attackAreaRadius < this.x &&
                target.y + target.attackAreaRadius > this.y &&
                target.y - target.attackAreaRadius < this.y) {
                this.speed = 0;
                this.cannonFire();
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
    
    this.drawAimDirection = function(){
        ball.x = this.x + Math.cos(circle.angle) * circle.radius;
        ball.y = this.y + Math.sin(circle.angle) * circle.radius;
        
        circle.angle += ball.speed;
        
        drawBitmapCenteredWithRotation(aimArrow,ball.x,ball.y,ball.ang);
        
    }
    
    this.draw = function() {
        drawBitmapCroppedWithRotation(this.myShipPic,this.x,this.y,this.ang,this.cropX);
        this.drawLife();
        if (this.playerControlled) {
            this.drawAimDirection();
        }
        //this.drawAimDirection();
        //function used for debugging purpose, this is the damage area
        //colorCircle(this.randomX,this.randomY,2,'red');
        this.myShot.draw();
    }
    
}