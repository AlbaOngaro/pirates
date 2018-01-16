var shipPic = document.createElement('img');
var seaPic = document.createElement('img');
var landPic = document.createElement('img');

var picsToLoad = 0;

function countLoadedImages(){
    picsToLoad--;
    console.log(picsToLoad);
    if (picsToLoad == 0) {
        startGame();
    }
}

function beginLoadingImages(imgVar, fileName){
    imgVar.onload = countLoadedImages;
    imgVar.src = fileName;
}

function loadImages(){
    
    var imageList = [
        {varName: seaPic, theFile: "assets/images/Tiles/tile_73.png"},
        {varName: landPic, theFile: "assets/images/Tiles/tile_68.png"},
        {varName: shipPic, theFile: "assets/images/Ships/ship (3).png"}
    ]
    
    picsToLoad = imageList.length;
    
    for (var i=0; i<imageList.length; i++) {
        beginLoadingImages(imageList[i].varName,imageList[i].theFile);
    }
}