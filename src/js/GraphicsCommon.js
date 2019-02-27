function drawBitmapCroppedWithRotation (useBitmap,atX,atY,withAng,cropX) {
    canvasContext.save();
    canvasContext.translate(atX,atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap,cropX,0,useBitmap.width/2,useBitmap.height,-useBitmap.width/4,-useBitmap.height/2,useBitmap.width/2,useBitmap.height);
    canvasContext.restore();
}
function drawBitmapCenteredWithRotation (useBitmap,atX,atY,withAng) {
    canvasContext.save();
    canvasContext.translate(atX,atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
    canvasContext.restore();
}
function drawCenteredImage (useImage,xPos,yPos){
    canvasContext.drawImage(useImage,xPos-useImage.width/2,yPos-useImage.height/2);
}
function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function strokeRect(topLeftX,topLeftY, boxWidth,boxHeight, strokeColor,strokeWidth) {
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = strokeWidth;
    canvasContext.strokeRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(alignment, fontDetails, fillColor, showWords, textX, textY) {
    canvasContext.textAlign = alignment;
    canvasContext.font = fontDetails;
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}