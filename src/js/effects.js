function drawExplosions (img, sx, sy, swidth, sheight, x, y, width, height) {
    
    tickCount++;
    
    var frames = img.width/swidth;
    
    if (tickCount > ticksPerFrame) {
    	tickCount = 0;
        if (frameIndex<frames) {
            frameIndex += 1;    
        } else {
            enemyHit = false;
            playerHit = false;
        }
    }

    canvasContext.drawImage(img, frameIndex*sx, sy, swidth, sheight, x, y-sheight/2, width, height);
}

// img	Specifies the image, canvas, or video element to use	 
// sx	Optional. The x coordinate where to start clipping	
// sy	Optional. The y coordinate where to start clipping	
// swidth	Optional. The width of the clipped image	
// sheight	Optional. The height of the clipped image	
// x	The x coordinate where to place the image on the canvas	
// y	The y coordinate where to place the image on the canvas	
// width	Optional. The width of the image to use (stretch or reduce the image)	
// height