//Create variables here
var dog, happyDog, dataBase, foodStock, foods, dogImage, dogImage2

function preload()
{
	dogImage = loadImage("Dog.png");
dogImage2 = loadImage("happydog.png");
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(200, 200, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.15;

dataBase = firebase.database();

  foodStock = dataBase.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  
background(46, 139, 87);

  //add styles here

  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogImage2);
  }
  drawSprites();
  textSize(15);
  stroke("red");
  fill("green");
  text("Food remaining: " +foods, 170, 150);
  text("Press Up arrow key to feed your pet!", 130, 10, 300, 20);

}

function readStock(data){
  foods = data.val();
}

function writeStock(x){

if (x<=0){
  x=0;
} else {
  x = x-1;
}

  dataBase.ref('/').update({
    Food:x
  })

}



