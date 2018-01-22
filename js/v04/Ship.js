const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.04;
const REVERSE_POWER = 0.025;
const ATTACK_RANGE = 50;
var isShooting = false;

function shipClass() {
    
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.turn_rate = 0.02;
    this.myShipPic;
    this.name ="Untitled car";

    this.attackAreaRadius = 130;
    this.damageAreaRadius = 15;
    this.areaColor = 'rgba( 255, 87, 51 ,0.5)';
    
    this.life = 100;
    
    this.myShot = new shotClass();
    this.enemyShot = new shotClass();
    
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
        
        if (this.playerControlled) {
            this.x = camPanX + canvas.width/2;
            this.y = camPanY + canvas.height/2;
        } else {
            this.x = canvas.width;
            this.y = canvas.height/4;
        }
        
        this.name = shipName;
        this.myShipPic = whichImage;
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
    }
    
    this.cannonFire = function() { ////   
        if (this.myShot.isReadyToFire()) {
            this.myShot.shootFrom(this,30);
        }////
        if (this.enemyShot.isReadyToFire()){
            this.enemyShot.shootFrom(this,50);
        }
    } ////
    
    //the target argument is used only for the enemy player
    this.move = function(target) {
        
        this.speed *= GROUNDSPEED_DECAY_MULT;

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
                this.attack = true;
            } else {
                this.attack = false;
            }
        }
        
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed; 
        
        //ship collisions
        shipWorldHandling(this);
        
        
        if (enemy.x + enemy.damageAreaRadius > this.myShot.x &&
            enemy.x - enemy.damageAreaRadius < this.myShot.x &&
            enemy.y + enemy.damageAreaRadius > this.myShot.y &&
            enemy.y - enemy.damageAreaRadius < this.myShot.y) 
        {
            this.myShot.lastShotX = this.myShot.x;
            this.myShot.lastShotY = this.myShot.y;
            this.myShot.shotLife = 0;
            playerHit = true;
            frameIndex = 0;
            enemy.life -= 5;
            if (enemy.life <= 30) {
                enemy.myShipPic = greenShipPicDam;
            }
        }
        
        
        if (p1.x + p1.damageAreaRadius > this.enemyShot.x &&
            p1.x - p1.damageAreaRadius < this.enemyShot.x &&
            p1.y + p1.damageAreaRadius > this.enemyShot.y &&
            p1.y - p1.damageAreaRadius < this.enemyShot.y) 
        {
            this.enemyShot.lastShotX = this.enemyShot.x;
            this.enemyShot.lastShotY = this.enemyShot.y;
            this.enemyShot.shotLife = 0;
            enemyHit = true;
            frameIndex = 0;
            p1.life -= 5;  
            if (p1.life <= 30) {
                p1.myShipPic = redShipPicDam;
            }
        }
        
        
        this.myShot.move();
        this.enemyShot.move();
        
    }
    
    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myShipPic,this.x,this.y,this.ang);
        //function used for debugging purpose, this is the damage area
        //colorCircle(this.x,this.y,this.damageAreaRadius,this.areaColor);
        this.myShot.draw();
        this.enemyShot.draw();
    }
    
}