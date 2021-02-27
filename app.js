
window.onload=function(){
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
    const golfball = document.getElementById("golfball");

    //Drawing inital golfball
    var startx= 150;
    var starty=300;
    ctx2.drawImage(golfball, startx, starty, 42, 44.3);

    //initializing some variables for the click function
    var min= startx;
    count=0;
    var startover= false;
    var playerTurn=true;

    // draw ball function. clearing the second canvas to get rid of old golfball position. then drawing new one. 
    function drawBall(x,y){
        ctx2.clearRect(0,0, canvas2.width, canvas2.height);
        ctx2.drawImage(golfball, x, y, 42, 44.3);
    }
    
    //event listener
    canvas2.addEventListener('click', function(event){
        
        //if startover is true the x postion goes back to 150 if not then it continues getting random higher x values until close enough to the hole. or strokes reach 5
        if (startover){
            x=150;
            min=x;
            count=0;
        }else{
            var x= Math.floor(Math.random()*(760-min)+min);
            count++;
        }
        startover= false;

        // if number of strokes is less than 4 and x values is less than 730 (not close enough to hole) then uses new random x position that is further and draws new golfball
        if(count<=4 && x<730){
            min=x;
            console.log(x);
            var y= -12/61*x+20100/61;
            drawBall(x,y);
        }else if (count<=4 && x>730){      // if count is less than 4 but x is greater than 730(close enought to hole) than displays last golfball position and startsover=true
            console.log(x);
            var y= -12/61*x+20100/61;
            drawBall(x,y);
            startover=true;
            count=0;
            player1.win();
            console.log(player1);           
        }
        else {                            // if stroke reaches 5 then force ball to go to hole by drawing ball at x=755 and startsover. 
            var x= 755;
            console.log(x);
            var y= -12/61*x+20100/61;
            drawBall(x,y);
            startover=true;
            count=0;
            player1.win(); 
            console.log(player1);
        }
        console.log(count);

    });


    console.log(player1);
    document.getElementById("p1wins").innerHTML="Player 1 wins: "+player1.wins;
    document.getElementById("p1losses").innerHTML="Player 1 losses: "+player1.losses;
    document.getElementById("p2wins").innerHTML="Player 2 wins: "+player2.wins;
    document.getElementById("p2losses").innerHTML="Player 2 losses: "+player2.losses;

}




