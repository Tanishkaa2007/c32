const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();  
      
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }

}

//function to change the background image according to the time of the day 
async function getBackgroundImg(){
    //storing the api link to retrieve the worldtime in the variable response
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    //storing the retrieved stored information in a new variable responseJson
    var responseJson = await response.json();
    //console.log(responseJson);

    //storing a part of the worldtime that is the datetime in a variable named datetime
    var dateTime = responseJson.datetime;

    //since only the hours of the day is required therefore the datetime is cut into a piece to store the hour of the day
    var hour= dateTime.slice(11,13);

    //if condition implies that if the time of the day prevails from 6am to 7pm the bright sunny background will be displayed
    if(hour>=06 && hour<=19){
        bg="sprites/bg.png";
        
    }

    //if the time does not agree with the if condition the
    else{
        bg="sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}