const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

var camPanX = 0.0;
var camPanY = 0.0;

function sliderMove() {
    var nextX = sliderX;
    var nextY = sliderY;

    if(p1.x < sliderX) {
      nextX += -p1.speed;
    }
    if(p1.x > sliderX) {
      nextX += p1.speed;
    }
    if(p1.y < sliderY) {
      nextY += -p1.speed;
    }
    if(p1.y > sliderY) {
      nextY += p1.speed;
    }

    if(isBrickAtPixelCoord(nextX,nextY) == false) {
      sliderX = nextX;
      sliderY = nextY;
    }
}

function sliderReset() {
    // center slider on screen
    sliderX = canvas.width/2;
    sliderY = canvas.height/2;
  }

function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(sliderX-cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(sliderY-cameraFocusCenterY);

    if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
      if(cameraFocusCenterX < sliderX)  {
        camPanX += Math.cos(p1.ang) * p1.speed;
      } else {
        camPanX += Math.cos(p1.ang) * p1.speed;
      }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
      if(cameraFocusCenterY < sliderY)  {
        camPanY += Math.sin(p1.ang) * p1.speed;
      } else {
        camPanY += Math.sin(p1.ang) * p1.speed;
      }
    }
    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    if(camPanX < 0) {
      camPanX = 0;
    }
    if(camPanY < 0) {
      camPanY = 0;
    }
    var maxPanRight = MAP_COLS * TILE_W - canvas.width;
    var maxPanTop = MAP_ROWS * TILE_H - canvas.height;
    if(camPanX > maxPanRight) {
      camPanX = maxPanRight;
    }
    if(camPanY > maxPanTop) {
      camPanY = maxPanTop;
    }
}