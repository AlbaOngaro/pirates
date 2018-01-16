var tilePics = [];

var shipPic = document.createElement('img');
var greenShipPic = document.createElement('img');

var picsToLoad = 0;

function countLoadedImages(){
    picsToLoad--;
    //console.log(picsToLoad);
    if (picsToLoad == 0) {
        startGame();
    }
}

function beginLoadingImages(imgVar, fileName){
    imgVar.onload = countLoadedImages;
    imgVar.src = "assets/images/"+fileName;
}

function loadMapTiles(tileCode, fileName) {
    tilePics[tileCode] = document.createElement('img');
    beginLoadingImages(tilePics[tileCode],fileName);
}

function loadImages(){
    
    var imageList = [
        {varName: shipPic, theFile: "Ships/ship (3).png"},
        {varName: greenShipPic, theFile: "Ships/ship (4).png"},
        
        {tileType: MAP_SEA, theFile: "Tiles/tile_73.png"},
        {tileType: MAP_LANDS, theFile: "Tiles/tile_68.png"},
        {tileType: MAP_PALM, theFile: "Tiles/tile_97.png"},
        {tileType: MAP_ENEMY, theFile: "Tiles/tile_98.png"},
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