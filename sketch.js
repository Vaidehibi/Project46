//main game
var button1,tree1,levels;

//pong game
var playerPaddle,computerPaddle,ball,computerScore,playerScore,edges,gameState11;

function setup(){
  createCanvas(400,400)

  levels="level1"

  button1=createSprite(200,200,20,20);
  button1.shapeColor="black";

  tree1= createSprite(200,100,30, 50);
  tree1.shapeColor="green"
  tree1.visible= false;

//ponggame
playerPaddle = createSprite(390,200,10,70);
playerPaddle.visible= false;
//playerPaddle.setAnimation("player");

computerPaddle = createSprite(10,200,10,70);
computerPaddle.visible= false;
//computerPaddle.setAnimation("robot");

ball = createSprite(200,200,12,12);
ball.visible= false;
//ball.setAnimation("ball");

computerScore = 0;
 playerScore = 0;
 edges= createEdgeSprites();

 gameState1="serve";

}

function draw(){
  background("white");

  if(mousePressedOver(button1)){
    //place the texts of the game here
    levels="level2";
  }

  if(levels==="level2"){
    button1.visible=false;
    tree1.visible=true;
    
    if(mousePressedOver(tree1)){
      levels="ponggame";
    }

//**************************************************************************** */
//pong game
if(levels==="ponggame"){
tree1.visible=false;
computerPaddle.visible=true;
playerPaddle.visible=true;
ball.visible=true;

if (gameState1 === "serve") {
  text("Press Space to Serve",150,180);
}

//display scores
text(computerScore, 170,20);
text(playerScore, 230,20);

//make the player paddle move with the mouse's y position
playerPaddle.y = World.mouseY;

//AI for the computer paddle
//make it move with the ball's y position
computerPaddle.y = ball.y;

//draw line at the centre
for (var i = 0; i < 400; i=i+20) {
  line(200,i,200,i+10);
}

//create edge boundaries
  //make the ball bounce with the top and the bottom edges
  edges=createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);

  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState1 === "serve") {
    serve();
    gameState1 = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      computerScore = computerScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState1 = "serve";
  }
  
  if (playerScore === 5 || computerScore === 5){
    gameState1 = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState1 === "over") {
    gameState1 = "serve";
    computerScore = 0;
    playerScore = 0;
  }
    }
  }

  drawSprites();
}



//functions for pong game

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}