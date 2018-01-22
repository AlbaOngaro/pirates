var tilePics = [];

var redShipPic = document.createElement('img');
var greenShipPic = document.createElement('img');
var redShipPicDam = document.createElement('img');
var greenShipPicDam = document.createElement('img');
var shotPic = document.createElement('img');
var explosionPic = document.createElement('img');

var picsToLoad = 0;

function countLoadedImages(){
    picsToLoad--;
    if (picsToLoad == 0) {
        startGame();
    }
}

function beginLoadingImages(imgVar, fileName){
    imgVar.onload = countLoadedImages;
    imgVar.src = "assets/images/v04/"+fileName;
}

function loadMapTiles(tileCode, fileName) {
    tilePics[tileCode] = document.createElement('img');
    beginLoadingImages(tilePics[tileCode],fileName);
}

function loadImages(){
    
    var imageList = [
        {varName: redShipPic, theFile: "Ships/ship (3).png"},
        {varName: greenShipPic, theFile: "Ships/ship (4).png"},
        {varName: redShipPicDam, theFile: "Ships/ship (9).png"},
        {varName: greenShipPicDam, theFile: "Ships/ship (10).png"},
         
        {varName: shotPic, theFile: "Parts/cannonBall.png"},
        {varName: explosionPic, theFile: "Effects/explosion.png"},
        
        
        {tileType: MAP_SEA, theFile: "Tiles/sea.png"},
        {tileType: SAND_BOTTOM, theFile: "Tiles/sand_bottom.png"},
        {tileType: SAND_LEFT, theFile: "Tiles/sand_left.png"},
        {tileType: SAND_TOP, theFile: "Tiles/sand_top.png"},
        {tileType: SAND_RIGHT, theFile: "Tiles/sand_right.png"},
        
        {tileType: SAND_TOP_LEFT, theFile: "Tiles/sand_top_left.png"},
        {tileType: SAND_TOP_RIGHT, theFile: "Tiles/sand_top_right.png"},
        {tileType: SAND_BOTTOM_LEFT, theFile: "Tiles/sand_bottom_left.png"},
        {tileType: SAND_BOTTOM_RIGHT, theFile: "Tiles/sand_bottom_right.png"},
        
        {tileType: SAND_CENTER, theFile: "Tiles/sand_center.png"},
        
        {tileType: SAND_ANGLE_TOP_LEFT, theFile: "Tiles/angle_top_left.png"},
        {tileType: SAND_ANGLE_TOP_RIGHT, theFile: "Tiles/angle_top_right.png"},
        {tileType: SAND_ANGLE_BOTTOM_LEFT, theFile: "Tiles/angle_bottom_left.png"},
        {tileType: SAND_ANGLE_BOTTOM_RIGHT, theFile: "Tiles/angle_bottom_right.png"},
        
        {tileType: PALM, theFile: "Tiles/palm.png"},
    ];
    
    picsToLoad = imageList.length;
    
    for (var i=0; i<imageList.length; i++) {
        if (imageList[i].varName != undefined) {
            beginLoadingImages(imageList[i].varName,imageList[i].theFile);
        } else {
            loadMapTiles(imageList[i].tileType,imageList[i].theFile);
        }
        
    }
}