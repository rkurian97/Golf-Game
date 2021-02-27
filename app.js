//Players
let player1= new Players("Player 1");
let player2= new Players("Player 2");

//Background canvas
const canvas= document.getElementById("bckgCanvas")
const ctx= canvas.getContext("2d");

//Draw background
const golfcourse= document.getElementById("golfcourse")
ctx.drawImage(golfcourse, 0, 0);

// Drawing the hole
ctx.beginPath();
ctx.arc(760, 180, 10, 0, 2 * Math.PI);
ctx.lineWidth = 0;
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

//second canvas
const canvas2 = document.getElementById("myCanvas");
const ctx2 = canvas2.getContext("2d");

//getting golfball image
// const golfball = document.getElementById("golfball");

const golfball = new Image()
golfball.src = 'assets/images/golfball2.png'

//Drawing inital golfball onload
var startx= 150;
var starty=300;

golfball.onload=function(){
    ctx2.drawImage(golfball, startx, starty, 42, 44.3);
}

//initializing some variables for the click function
var min= startx;
var stroke=0;
var tie= 0;
var startover= false;
var playerTurn=true;
scoretype= ['Hole-in-One', 'Double Eagle', 'Eagle', 'Birdie', 'Par'];

// draw ball function. clearing the second canvas to get rid of old golfball position. then drawing new one.
function drawBall(x,y){
    ctx2.clearRect(0,0, canvas2.width, canvas2.height);
    ctx2.drawImage(golfball, x, y, 42, 44.3);
}

// function for one match takes in which player object
function match(player){
    //if startover is true then ball goes back to original position, otherwise ball will continue moving towards hole
    if (startover){
        x=150;
        min=x;
        stroke=0;
    }else{
        var x= Math.floor(Math.random()*(760-min)+min);
        stroke++;
    }
    startover= false;

    if(stroke<=4 && x<730){            // if number of strokes is<4 and not close enough to hole. ball continues going close to hole
        min=x;
        var y= -12/61*x+20100/61;
        drawBall(x,y);

        document.getElementById("score").innerHTML=player._name+ ": "; // Display Player

    }else if (stroke<=4 && x>730){      //Ball reached hole condition 1: ball is close enough to hole and strokes is less than 4. PLayer scored. Startover becomes true player round is over
        var y= -12/61*x+20100/61;
        drawBall(x,y);

        player._stroke=stroke;
        startover=true;

        document.getElementById("score").innerHTML=player._name+ ": "+ scoretype[stroke-1]; // display the players scores aka Hole-in-One thru Par

        if (playerTurn==false){            // if it is Player 2 turn. Then match is over. compare strokes between player 1/2 and see who won.
            console.log(player1.strokes);
            console.log(player2.strokes);
            if (player1.strokes<player2.strokes){
                player1.win();
            }else if (player1.strokes==player2.strokes){
                tie++;
            }else{
                player2.win();
            }
        }
        playerTurn=!playerTurn;    // switch player

    }
    else {                            //Ball reached hole condition 2: if stroke reaches 5 then force ball to go to hole by drawing ball at x=755 and startsover.
        var x= 755;
        var y= -12/61*x+20100/61;
        drawBall(x,y);

        player._stroke=stroke;
        startover=true;

        document.getElementById("score").innerHTML=player._name+ ": "+ scoretype[stroke-1];  // display the players scores aka Hole-in-One thru Par It will always be Par here

        if (playerTurn==false){  // if it is Player 2 turn. Then match is over. compare strokes between player 1/2 and see who won.
            console.log(player1.strokes);
            console.log(player2.strokes);
            if (player1.strokes<player2.strokes){
                player1.win();
            }else if (player1.strokes==player2.strokes){
                tie++;
            }else{
                player2.win();
            }
        }

        playerTurn=!playerTurn;     // switch player
    }
}

//event listener
canvas2.addEventListener('click', function(event){

    if (playerTurn){         // if playerturn is true run match with player 1
        match(player1);
    }else{                   // if playerturn is false run match with player 2
        match(player2);
    }

    //Display results
    document.getElementById("p1wins").innerHTML="Player 1 wins: "+player1.wins;
    document.getElementById("p1losses").innerHTML="Player 1 losses: "+player1.losses;
    document.getElementById("p2wins").innerHTML="Player 2 wins: "+player2.wins;
    document.getElementById("p2losses").innerHTML="Player 2 losses: "+player2.losses;
    document.getElementById("ties").innerHTML="Ties: "+tie;

});
