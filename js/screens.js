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
    var textColor;
    if (winner == p1.name) {
        textColor = "#D96257";
    } else {
        textColor = "#82BE5E";
    }
    colorText("center","30px TradeWinds", textColor, winner+" Wins!", canvas.width/2,canvas.height/2);
}