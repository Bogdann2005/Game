var can = document.getElementById("canvas")
var ctx = can.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
//score
var score = 0;


//img
bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeDown.src = "img/flappy_bird_pipeBottom.png";
//audio
var fly = new Audio();
var scoree = new Audio();
fly.src = "audio/fly.mp3"
scoree.src = "audio/score.mp3"
//bird position
var birdX = 10;
var birdY = 150;
var grav = 1.5;
//wall
var pipe = [];

pipe[0] = {
 x : can.width,
 y : 0
}
var gap = 90;
//click
document.addEventListener("keydown", moveUp);
function moveUp() {
    birdY -= 30;
    fly.play();
   }


//draw

function draw(){
    ctx.drawImage(bg,0,0);
  
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
       
        pipe[i].x--;
       
        if(pipe[i].x == 125) {
        pipe.push({
        x : can.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    }if(birdX + bird.width >= pipe[i].x
    && birdX <= pipe[i].x + pipeUp.width
    && (birdY <= pipe[i].y + pipeUp.height
    || birdY + bird.height >= pipe[i].y + pipeUp.height + gap) || birdY + bird.height >= can.height - fg.height) {
    location.reload(); // Перезагрузка страницы
    }
   
    if(pipe[i].x == 5) {
    score++;
    scoree.play();
    }
    }ctx.drawImage(fg, 0, can.height - fg.height);
 ctx.drawImage(bird, birdX, birdY);

 birdY += grav;
 
 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, can.height - 20);
 requestAnimationFrame(draw);
}





pipeDown.onload = draw; 
