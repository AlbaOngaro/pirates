var alpha = 1;

function loadScreenText(){
    alpha-= 0.03;
    
    if (alpha <= 0) {
        alpha++;
    }
    
    var textColor = "rgba(255,255,255,"+alpha+")";
    colorRect(0,0,canvas.width,canvas.height,'black');          
    colorText("center","30px TradeWinds",textColor,"Loading", canvas.width/2,canvas.height/2);
}

function winnerScreen () {
    var text = winner.name;
    var textColor;
    if (winner.myShipPic == redShipPic) {
        textColor = "#D96257";
    } else if (winner.myShipPic == greenShipPic) {
        textColor = "#82BE5E";
    } else if (winner.myShipPic == blueShipPic) {
        textColor = "#6b93b8";
    } else if (winner.myShipPic == yellowShipPic) {
        textColor = "#e7ba23";
    }
    colorText("center","30px TradeWinds", textColor, text+" Wins!", canvas.width/2,canvas.height/2);
}