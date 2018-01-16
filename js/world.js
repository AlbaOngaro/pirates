var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DISTANCE_FROM_CAMERA_X = 150;
const PLAYER_DISTANCE_FROM_CAMERA_Y = 150;


const TILE_W = 40;
const TILE_H = 40;
const MAP_GAP = 2;
const MAP_COLS = 20;
const MAP_ROWS = 15;
var levelOne = [ 06, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 07,
				 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 11, 04, 12, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 03, 15, 05, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 13, 02, 14, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
                 05, 01, 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 03,
				 08, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 09
               ];

var worldGrid = [];

const MAP_SEA = 0;
const MAP_PLAYER_START = 1;

const SAND_TOP = 2;
const SAND_RIGHT = 3;
const SAND_BOTTOM = 4;
const SAND_LEFT = 5;
const SAND_TOP_LEFT = 6;
const SAND_TOP_RIGHT = 7;
const SAND_BOTTOM_LEFT = 8;
const SAND_BOTTOM_RIGHT = 9;
const SAND_CENTER = 10;
const SAND_ANGLE_TOP_LEFT = 11;
const SAND_ANGLE_TOP_RIGHT = 12;
const SAND_ANGLE_BOTTOM_LEFT = 13;
const SAND_ANGLE_BOTTOM_RIGHT = 14;

const PALM = 15;


function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < MAP_COLS &&
		row >= 0 && row < MAP_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return MAP_LANDS;
	}
}

function shipWorldHandling(whichShip) {
	var shipWorldCol = Math.floor(whichShip.x / TILE_W);
	var shipWorldRow = Math.floor(whichShip.y / TILE_H);
	var worldIndexUnderShip = rowColToArrayIndex(shipWorldCol, shipWorldRow);

	if(shipWorldCol >= 0 && shipWorldCol < MAP_COLS &&
		shipWorldRow >= 0 && shipWorldRow < MAP_ROWS) {

        var tileHere = returnTileTypeAtColRow( shipWorldCol,shipWorldRow );
        
        //console.log(tileHere);
       /* if (tileHere == MAP_TREASURE){
            console.log(whichShip.name+" WINS!");
            loadLevel(levelOne);
        } else*/ if (tileHere != MAP_SEA) {
            
            whichShip.x -= Math.cos(whichShip.ang) * whichShip.speed;
            whichShip.y -= Math.sin(whichShip.ang) * whichShip.speed;
            
            whichShip.speed *= -0.5;
		} // end of world found
	} // end of valid col and row
} // end of shipWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + MAP_COLS * row;
}

function tileHasTransparency(checkTileType){
    return checkTileType != SAND_CENTER;
}

function drawWorld() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    
	for(var eachRow=0;eachRow<MAP_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<MAP_COLS;eachCol++) {
            
            var tileKind = worldGrid[arrayIndex];
            var useImage = tilePics[tileKind];
            
            if (tileHasTransparency(tileKind)) {
                canvasContext.drawImage(tilePics[MAP_SEA],drawTileX,drawTileY);   
            }
        
            canvasContext.drawImage(useImage,drawTileX,drawTileY);
        
            arrayIndex++;
            drawTileX += TILE_W;
            
		} // end of for each world
        drawTileX = 0;
        drawTileY += TILE_H;
	} // end of for each row

} // end of drawWorld func