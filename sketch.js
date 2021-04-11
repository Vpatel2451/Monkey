
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var Ground
var score

var grass;

var invisground;

var survivaltime =0;

var backgroundimage, background1;

function preload(){
  
  

  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backgroundimage = loadImage("jungle.jpg");
}



function setup() {
   
  createCanvas(600,600);
    

  monkey = createSprite (100,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  Ground = createSprite(110,350,900,10)
  Ground.velocityX=-4;
  Ground.x=Ground.width/2;
  console.log(Ground.x)

  
   FoodGroup = new Group();
  obstacleGroup = new Group();
  
  invisground = createSprite (110,350,900,10);
  invisground.visible = false;
}


function draw() {
background('white')
  
   if(gameState === PLAY){
      if (round.x < 0){
      Ground.x = Ground.width/2;
    }
     if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;

    }
         monkey.velocityY = monkey.velocityY + 0.8
  
     
    if (Ground.x < 0){
      Ground.x = Ground.width/2;
    }
     Ground.visible = true;
      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      }
   }
  else if (gameState === END) {
    
    
    
     Ground.velocityX = 0;
      monkey.velocityY = 0
    
       obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
  }
  
  monkey.collide(invisground);
  
  stroke("white");
  textSize(20);
  fill("white")
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivaltime,100,50);
  
 
    
  
  drawSprites();
  spawnBananas();
  spawnObstacles();
}

function spawnBananas(){
  if (frameCount % 80 === 0){
    var banana = createSprite(600,115,10,10);
    banana.velocityX = -(6);
    banana.addImage(bananaImage);
    
    banana.y = Math.round(random(240,240));
    
    banana.lifetime = 400;
    banana.scale = 0.1;
    
        monkey.depth = banana.depth;
    banana.depth = banana.depth + 1;
    
     FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 60=== 0){
    var obstacle = createSprite(600,315,10,10);
    obstacle.velocityX = -(6);
    obstacle.addImage(obstacleImage);
    
    obstacle.y = Math.round(random(330,330));
    
    obstacle.lifetime = 400;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    
    
  }
}



