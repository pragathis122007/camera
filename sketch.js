var ghost,ghostImage;
var tower,towerImage;
var doorGroup,climberGroup,doorImage,climberImage;

function preload() {
ghostImage = loadAnimation("ghost-jumping.png","ghost-standing.png");
towerImage = loadImage("tower.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600); 
  tower = createSprite(300,300,20,20);
  tower.velocityY = 7;
  tower.addImage("tower",towerImage);
  tower.scale = 1;
  
  ghost = createSprite(300,300,20,20);
  ghost.addAnimation("ghost",ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw(){
  background("blue");
  
  if (keyDown("space")){
    ghost.velocityY = -7;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  for(var plr in allPlayers){
    //add 1 to the index for every loop
    index = index + 1 ;

    //position the cars a little away from each other in x direction
    x = x + 200;
    //use data form the database to display the cars in y direction
    y = displayHeight - allPlayers[plr].distance;
    cars[index-1].x = x;
    cars[index-1].y = y;

    if (index === player.index){
      cars[index - 1].shapeColor = "red";
      camera.position.x = displayWidth/2;
      camera.position.y = cars[index-1].y
    }
   
    //textSize(15);
    //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
  }
  // if (tower.y > 400){
    //  tower.y = 300;
    //}
  door();
  drawSprites();
}

function door(){
  if (frameCount % 80 === 0){
    var door = createSprite(300,500,20,20);
    door.x = Math.round(random(100,400));
    door.addImage("door",doorImage);
    door.scale = 1;
    
     var climber = createSprite(300,550,20,20);
   climber.x = door.x;
    climber.addImage("climber",climberImage);
    climber.scale = 1;
    
    door.velocityY = -7;
    climber.velocityY = -7;
    
    door.lifeTime = 400;
    climber.lifeTime = 400;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
  }
  
}
