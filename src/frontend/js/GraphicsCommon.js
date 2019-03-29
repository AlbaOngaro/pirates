export default class GC {
    static drawBitmapCroppedWithRotation (ctx, img, x, y, deg, cx) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(deg);
        ctx.drawImage(img, cx, 0, img.width/2, img.height, -img.width/4, -img.height/2, img.width/2, img.height);
        ctx.restore();
    }

    static drawBitmapCenteredWithRotation (ctx, img, x, y, deg) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(deg);
        ctx.drawImage(img, -img.width/2, -img.height/2);
        ctx.restore();
    }

    static drawCenteredImage (ctx, img, x, y){
        ctx.drawImage(img, x-img.width/2, y-img.height/2);
    }

    static colorRect (ctx, topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }
    
    static strokeRect (ctx, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeWidth) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(topLeftX,topLeftY, boxWidth,boxHeight);
    }
    
    static colorCircle (ctx, centerX, centerY, radius, fillColor) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(centerX,centerY, radius, 0, Math.PI*2, true);
        ctx.fill();
    }
    
    static colorText (ctx, alignment, font, fill, text, x, y) {
        ctx.textAlign = alignment;
        ctx.font = font;
        ctx.fillStyle = fill;
        ctx.fillText(text, x, y);
    }
}