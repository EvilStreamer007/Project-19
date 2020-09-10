
var monkey;
var monkey_img;

var scene;
var scene_png;

var obstaclegroup;
var stone;
var stone_img;

var bananagroup ;
var banana;
var banana_img;

var gamestate , win , score;

var scene;
var scene_img;
var hunger;
var score;
var ground;
var WIN;

function preload() {
  
  monkey_img = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
   stone_img = loadImage("stone.png");
   banana_img = loadImage("banana.png");  
   scene_img = loadImage("jungle.jpg");
}

function setup(){
  createCanvas(400, 400);  

  monkey = createSprite(50,380,0,0);
  monkey.addAnimation("happy",monkey_img);
  
  scene = createSprite(200,200,400,400);
  scene.addImage("jungle",scene_img);
  scene.velocityX = -5;
  
  ground = createSprite(400,385,400,5);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  ground.visible = false;
  
  obstacelgroup = new Group();
  bananagroup = new Group();
  
  hunger = -10;
}

function draw() {
  background(220);
  edges = createEdgeSprites();
  
  switch(score){
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;
              break;
    case 30 : monkey.scale = 0.16;
              break;
    case 40 : monkey.scale = 0.18;
              break;
    case 50 : monkey.scale = 0.2;
              break;
    default : break;
  }
  
  if(gamestate === "play"){
    
     score = Math.round(frameCount/10);
     
  if(ground.x === 80){
     ground.width = ground.x / 2;
     ground.x = 200;
   }
   
  if(frameCount%80===0){
     spawn_stones();
     spawn_bananas();
  }
  
  if(keyDown("space") && monkey.y >= 360){
     monkey.velocityY=-9;
  }
  
  monkey.velocityY=monkey.velocityY + 0.5;
  
  
 if(monkey.isTouching(obstaclegroup)){
    gamestate = "end";
  }

  }

  else if(gamestate === "end"){
          obstaclegroup.destroyEach();
          bananagroup.destroyEach();
          monkey.velocityY=0;
  } 
  
  if(monkey.isTouching(bananagroup)){
     bananagroup.destroyEach();
     hunger = hunger + 1;
  }
  
  if(hunger === 0){
     WIN = 1;
     
  }
  
  else if(WIN === 1){
          monkey.destroy();
          obstaclegroup.destroyEach();
          bananagroup.destroyEach();
  }
  
  if(monkey.collide(obstaclegroup)){
     monkey.scale = monkey.scale - 0.2;
   }
  
  monkey.collide(ground);
  
  drawSprites();
  fill("cyan");
  textSize(15);
  text("Survival Time : "+score,150,40);
  text("Hunger Level : "+hunger,150,20);
  }

function spawn_stones(){
   stone = createSprite(400,385,0,0);
   stone.setAnimation("Stone",stone_img);
   stone.scale = 0.15;
   stone.velocityX = -5;
   obstaclegroup.add(stone);
   stone.setCollider("circle",0,0,160);
   stone.lifetime = 80;
}

function spawn_bananas(){
   banana = createSprite(400,3100,0,0);
   banana.setAnimation("Banana",banana_img);
   banana.scale=0.06;
   banana.velocityX = -5;
   bananagroup.add(banana);
   banana.setCollider("rectangle",0,0,1000,500);
   banana.lifetime=80;
   banana.y = random(310,210);
}