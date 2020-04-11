gameState = "start"
frameNum = 0;
frameMode = "null"
timer = 0;

function preload(){
  player_image = loadImage("player.png");
  battleShip_image = loadImage("battleShip.png");
  backgroundImage = loadImage("background.jpg");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  clickToPlay = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  clickToPlay.visible = false;

  player = createSprite(displayWidth/4, displayHeight/2, 50, 50);
  player.visible = false;
  player.addImage(player_image);

  battleShip = createSprite(displayWidth/4+displayWidth/2, displayHeight/2, 500, displayHeight-100)
  battleShip.visible = false;
  battleShip.addImage(battleShip_image);

  topEdge = createSprite(displayWidth/2,-5,displayWidth,10);
  bottomEdge = createSprite(displayWidth/2,displayHeight+5,displayWidth,10);

  shooter1 = createSprite(displayWidth/4+displayWidth/2-275, 0+100,50,10);
  shooter1.visible = false;

  shooter2 = createSprite(displayWidth/4+displayWidth/2-275, 0+100,50,10);
  shooter2.visible = false;

  shooter3 = createSprite(displayWidth/4+displayWidth/2-275, displayHeight/2,50,10);
  shooter3.visible = false;

  shooter4 = createSprite(displayWidth/4+displayWidth/2-275, 0+100,50,10);
  shooter4.visible = false;

  shooter5 = createSprite(displayWidth/4+displayWidth/2-275, displayHeight-100,50,10);
  shooter5.visible = false;

  shooter = new Group();

  laserGroup = new Group();

}

function draw() {
  background("#ffffff");  

  console.log(frameNum);

  if(gameState === "start"){
    textSize(24);
    fill("black");
    text("Click Anywhere to Play",displayWidth/2-100,displayHeight/2);
  }

  if(mousePressedOver(clickToPlay)&&gameState === "start"){
    gameState = "play";
  }

  if(gameState === "play" && frameMode === "null"){
    frameMode = "add" ;
    player.visible = true ;
    battleShip.visible = true ;
    battleShip.velocityY = 2;
    shooter.add(shooter1);
    shooter.add(shooter2);
    shooter.add(shooter3);
    shooter.add(shooter4);
    shooter.add(shooter5);

    shooter2.y = shooter3.y+((shooter5.y-shooter3.y)/2);
    shooter4.y = shooter1.y+((shooter3.y-shooter1.y)/2);
  }

  if(frameMode === "add"){
    shooter.setVelocityYEach(battleShip.velocityY);
    laserGroup.setLifetimeEach(2);
  }
  if(frameMode === "add" && frameNum<1000){
    frameNum++;
  }
  
  if(gameState === "play" && keyIsDown(UP_ARROW)){
    player.y-=20
  }

  if(gameState === "play" && keyIsDown(DOWN_ARROW)){
    player.y+=20;
  }
  
  if(gameState === "play" && player.y<0){
    player.y = displayHeight;
  }

  if(gameState === "play" && player.y>displayHeight){
    player.y = 0;
  }

  if(battleShip.isTouching(topEdge)){
    battleShip.velocityY = battleShip.velocityY*-1
  }

  if(battleShip.isTouching(bottomEdge)){
    battleShip.velocityY = battleShip.velocityY*-1
  }

  if(frameNum%100 === 0 && gameState === "play"){
    //laser = createSprite(displayWidth/4+displayWidth/2-275,Math.round(Math.random()*displayHeight),200,20);
    rand = Math.round(Math.random()*4)
    console.log(rand);

    if(rand === 0){
      laser = createSprite(displayWidth/4+displayWidth/2-275, 0+100,200,20);
      laser.y = shooter1.y
      laser.shapeColor = "red";
      laser.velocityX = -10
      laserGroup.add(laser);
    }

    if(rand === 1){
      laser = createSprite(displayWidth/4+displayWidth/2-275, 0+100,200,20);
      laser.y = shooter2.y;
      laser.shapeColor = "red";
      laser.velocityX = -10
      laserGroup.add(laser);
    }

    if(rand === 2){
      laser = createSprite(displayWidth/4+displayWidth/2-275, 0+100,200,20);
      laser.y = shooter3.y;
      laser.shapeColor = "red";
      laser.velocityX = -10
      laserGroup.add(laser);
    }

    if(rand === 3){
      laser = createSprite(displayWidth/4+displayWidth/2-275, 0+100,200,20);
      laser.y = shooter4.y;
      laser.shapeColor = "red";
      laser.velocityX = -10
      laserGroup.add(laser);
    }

    if(rand === 4){
      laser = createSprite(displayWidth/4+displayWidth/2-275, 0+100,200,20);
      laser.y = shooter5.y;
      laser.shapeColor = "red";
      laser.velocityX = -10;
      laserGroup.add(laser);
    }
    
  }

  if(frameNum>1000){
    frameNum+=10;
  }

  if(laserGroup.isTouching(player)) {
    gameState = "end"; 
  }

  if(gameState === "end"){
    frameMode = "null" ;
    frameNum = 0;
    laserGroup.destroyEach();
    shooter.destroyEach();
    battleShip.destroy();
    player.destroy();
    laserGroup.setLifetimeEach(-1);

    background("#ffffff");  

    text("Game Over",displayWidth/2-50,displayHeight/2-10) 
  }

  if(gameState === "play"){
    background(backgroundImage);
  }


  drawSprites();
}
