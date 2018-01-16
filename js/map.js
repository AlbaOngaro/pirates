const TILE_W = 40;
const TILE_H = 40;
const MAP_GAP = 2;
const MAP_COLS = 20;
const MAP_ROWS = 15;
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 3, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 2, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MAP_SEA = 0;
const MAP_LANDS = 1;
const MAP_PLAYER_START = 2;
const MAP_PALM = 3;
const MAP_ENEMY = 4;

function isObstacleAtColRow(col, row) {
	if(col >= 0 && col < MAP_COLS &&
		row >= 0 && row < MAP_ROWS) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return (trackGrid[trackIndexUnderCoord] != MAP_SEA);
	} else {
		return false;
	}
}

function shipTrackHandling(whichShip) {
	var shipTrackCol = Math.floor(whichShip.x / TILE_W);
	var shipTrackRow = Math.floor(whichShip.y / TILE_H);
	var trackIndexUnderShip = rowColToArrayIndex(shipTrackCol, shipTrackRow);

	if(shipTrackCol >= 0 && shipTrackCol < MAP_COLS &&
		shipTrackRow >= 0 && shipTrackRow < MAP_ROWS) {

		if(isObstacleAtColRow( shipTrackCol,shipTrackRow )) {
            
            whichShip.x -= Math.cos(whichShip.ang) * whichShip.speed;
            whichShip.y -= Math.sin(whichShip.ang) * whichShip.speed;
            
            whichShip.speed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of shipTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + MAP_COLS * row;
}

function drawTracks() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    
	for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {
            
            var tileKind = trackGrid[arrayIndex];
            var useImage = tilePics[tileKind];
        
            canvasContext.drawImage(useImage,drawTileX,drawTileY);
        
            arrayIndex++;
            drawTileX += TILE_W;
            
		} // end of for each track
        drawTileX = 0;
        drawTileY += TILE_H;
	} // end of for each row

} // end of drawTracks func