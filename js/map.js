const MAP_W = 40;
const MAP_H = 40;
const MAP_GAP = 2;
const MAP_COLS = 20;
const MAP_ROWS = 15;
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MAP_SEA = 0;
const MAP_LANDS = 1;
const MAP_PLAYER_START = 2;

function isLandAtColRow(col, row) {
	if(col >= 0 && col < MAP_COLS &&
		row >= 0 && row < MAP_ROWS) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return (trackGrid[trackIndexUnderCoord] == MAP_LANDS);
	} else {
		return false;
	}
}

function shipTrackHandling() {
	var shipTrackCol = Math.floor(shipX / MAP_W);
	var shipTrackRow = Math.floor(shipY / MAP_H);
	var trackIndexUnderShip = rowColToArrayIndex(shipTrackCol, shipTrackRow);

	if(shipTrackCol >= 0 && shipTrackCol < MAP_COLS &&
		shipTrackRow >= 0 && shipTrackRow < MAP_ROWS) {

		if(isLandAtColRow( shipTrackCol,shipTrackRow )) {
            
            shipX -= Math.cos(shipAng) * shipSpeed;
            shipY -= Math.sin(shipAng) * shipSpeed;
            shipSpeed *= -0.5;
		} // end of track found
	} // end of valid col and row
} // end of shipTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + MAP_COLS * row;
}

function drawTracks() {

	for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 

			if(trackGrid[arrayIndex] == MAP_SEA) {
                canvasContext.drawImage(seaPic,MAP_W*eachCol,MAP_H*eachRow);
				//colorRect(MAP_W*eachCol,MAP_H*eachRow, MAP_W-MAP_GAP,MAP_H-MAP_GAP, 'blue');
			} else if (trackGrid[arrayIndex] == MAP_LANDS) {
                canvasContext.drawImage(landPic,MAP_W*eachCol,MAP_H*eachRow);
            }
		} // end of for each track
	} // end of for each row

} // end of drawTracks func