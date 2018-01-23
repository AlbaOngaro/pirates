if (enemy.x + enemy.damageAreaRadius > p1.myShot.x &&
    enemy.x - enemy.damageAreaRadius < p1.myShot.x &&
    enemy.y + enemy.damageAreaRadius > p1.myShot.y &&
    enemy.y - enemy.damageAreaRadius < p1.myShot.y) {
    
    p1.myShot.lastShotX = p1.myShot.x;
    p1.myShot.lastShotY = p1.myShot.y;
    p1.myShot.shotLife = 0;
    
    playerHit = true;
    frameIndex = 0;
    
    enemy.life -= 5;
    
    if (enemy.life <= 30) {
        enemy.myShipPic = greenShipPicDam;
    }
}


if (p1.x + p1.damageAreaRadius > enemy.enemyShot.x &&
    p1.x - p1.damageAreaRadius < enemy.enemyShot.x &&
    p1.y + p1.damageAreaRadius > enemy.enemyShot.y &&
    p1.y - p1.damageAreaRadius < enemy.enemyShot.y) {
    
    enemy.enemyShot.lastShotX = enemy.enemyShot.x;
    enemy.enemyShot.lastShotY = enemy.enemyShot.y;
    enemy.enemyShot.shotLife = 0;
    
    enemyHit = true;
    frameIndex = 0;
    
    p1.life -= 5;
    
    if (p1.life <= 30) {
        p1.myShipPic = redShipPicDam;
    }
}