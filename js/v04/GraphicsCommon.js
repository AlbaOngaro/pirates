function drawBitmapCenteredWithRotation (useBitmap,atX,atY,withAng) {
    canvasContext.save();
    canvasContext.translate(atX,atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
    canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}


//spriteSheet,cropX,cropY,spriteW,spriteH,spriteX,spriteY,spriteW,spriteH

function drawAnimatedSpriteSheet (spriteSheet,cropY,spriteW,spriteH,spriteX,spriteY,spriteW,spriteH) {
    
    /// canvasContext.drawImage(explosionPic,spriteW*currFrame,cropY,spriteW,spriteH,spriteX,spriteY-spriteH/2,spriteW,spriteH);
    
    
}