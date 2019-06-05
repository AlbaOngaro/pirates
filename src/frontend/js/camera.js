export default class Camera {
    constructor({ target, panX, panY, offsetX, offsetY }){
        this.props = {
            target: target,
            panX: panX || 0.0,
            panY: panY || 0.0,
            offsetX: offsetX || 100,
            offsetY: offsetY || 100
        };
    }

    sliderMove() {

        const { target } = this.props;

        var nextX = sliderX;
        var nextY = sliderY;
    
        if (target.x < nextX) {
            nextX += -Math.abs(target.speed);
        }
        if (target.x > nextX) {
            nextX += Math.abs(target.speed);
        }
        if (target.y < nextY) {
            nextY += -Math.abs(target.speed);
        }
        if (target.y > nextY) {
            nextY += Math.abs(target.speed);
        }
    
        /* if (isBrickAtPixelCoord(nextX, nextY) == false) {
            sliderX = nextX;
            sliderY = nextY;
        } */
    }
}