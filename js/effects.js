function drawExplosions (spriteSheet,cropY,spriteW,spriteH,spriteX,spriteY,spriteW,spriteH) {
    
    tickCount++;
    
    var frames = spriteSheet.width/spriteW;
    
    if (tickCount > ticksPerFrame) {
    	tickCount = 0;
        if (frameIndex<frames) {
            frameIndex += 1;    
        } else {
            enemyHit = false;
            playerHit = false;
        }
    }

    canvasContext.drawImage(spriteSheet,frameIndex*spriteW,cropY,spriteW,spriteH,spriteX,spriteY-spriteH/2,spriteW,spriteH);    
    
}