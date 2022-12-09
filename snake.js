// Score
var score=0;
const scoreText = document.getElementById("score");

//BOARD
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

// SNAKE HEAD

var snakeX= blockSize * 10;
var snakeY= blockSize * 5;

// SNAKE BODY

var snakeBody= [];

//MOVE VELOCITY

var velocityX= 0;
var velocityY= 0;

// FOOD

var foodX;
var foodY;

var gameOver = false;

window.onload = function(){

    board = document.getElementById("board");
    board.height =  rows * blockSize;
    board.width =  columns * blockSize;

    // For draw on the board
    context = board.getContext("2d");
    randomFood();
    document.addEventListener("keyup",move);
    setInterval(update,1000/10)   
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX==foodX && snakeY ==foodY){
        snakeBody.push([foodX,foodY]);

        score++;
        randomFood();
        scoreText.textContent= score;
    }

    for (var i=snakeBody.length -1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

    snakeX+=velocityX * blockSize;
    snakeY+=velocityY * blockSize;

    context.fillStyle = "lime";
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    
    for (var k=0;k<snakeBody.length;k++){
        context.fillRect(snakeBody[k][0],snakeBody[k][1],blockSize,blockSize);
    }

    //Game over 
    if(snakeX < 0 || snakeX > columns*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver=true;
        score=0;
        scoreText.textContent=score;
        alert("game over");
    }

    // Check snake if collides with its body
    for (var k=0; k< snakeBody.length; k++){
        if(snakeX==snakeBody[k][0] && snakeY==snakeBody[k][1]){
            gameOver=true;
            score=0;
            scoreText.textContent=score;
            alert("game over");
                
        }
    }

}


function randomFood(){
    foodX= Math.floor(Math.random()*columns) *blockSize;
    foodY= Math.floor(Math.random()*rows) * blockSize;
}

function move(e){
    if(e.code=="ArrowUp" && velocityY !== 1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code=="ArrowLeft" && velocityX !==1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.code=="ArrowRight" && velocityX !==-1){
        velocityX=1;
        velocityY=0;
    }
    else if(e.code=="ArrowDown" && velocityY !==-1){
        velocityX=0;
        velocityY=1;
    }
}
