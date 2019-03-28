export default class GameManager {
    constructor(props){
        this.context = props.context;
    }

    drawBitmapCroppedWithRotation (img, x, y, deg, cx) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(deg);
        this.context.drawImage(img, cx, 0, img.width/2, img.height, -img.width/4, -img.height/2, img.width/2, img.height);
        this.context.restore();
    }

    drawBitmapCenteredWithRotation (img, x, y, deg) {
        this.context.save();
        this.context.translate(x, y);
        this.context.rotate(deg);
        this.context.drawImage(img, -img.width/2, -img.height/2);
        this.context.restore();
    }

    drawCenteredImage (img, x, y){
        this.context.drawImage(img, x-img.width/2, y-img.height/2);
    }

    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }
    
    strokeRect(topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeWidth) {
        this.context.strokeStyle = strokeColor;
        this.context.lineWidth = strokeWidth;
        this.context.strokeRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }
    
    colorCircle(centerX, centerY, radius, fillColor) {
        this.context.fillStyle = fillColor;
        this.context.beginPath();
        this.context.arc(centerX,centerY, radius, 0,Math.PI*2, true);
        this.context.fill();
    }
    
    colorText(alignment, font, fill, text, x, y) {
        this.context.textAlign = alignment;
        this.context.font = font;
        this.context.fillStyle = fill;
        this.context.fillText(text, x, y);
    }
}