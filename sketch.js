//Create variables here
var dog, dogImg, dogImg1
var database
var foodS, foodStock

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.15
  
  foodStock= database.ref('Food')
  foodStock.on("value",readStock)

  textSize(20)
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg1)
  }
  drawSprites();
  //add styles here
  fill("white")
  stroke("black")
  text("food remaning: "+ foodS,180,180)
  textSize(13)
  text("note: press upp arrow key to feed tom milk",150,100)
}
//function to read values from database
function readStock(data){
  foodS = data.val()
}
// function to write values to datbase
function writeStock(x){
  if(x <= 0 ){
    x=0
  }
  else{
    x = x-1
  }
  database.ref("/").update({
    Food:x
  })
}
