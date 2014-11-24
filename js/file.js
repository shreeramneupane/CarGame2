// JavaScript Document
var bullet;
var counter = 0;
var live = true;
var yPlayer = 10;
var yOpponent = 0;
var pitchLength = 5000;
var yPitch = -(pitchLength-500);
var opponentCrossed = 0;
var listOfOpponent = [];
var bulletFiredCount = 0;
var bulletFired = false;
var bulletBottom = 0;
var firedOpponent = 0;
var image = document.createElement("img");
image.setAttribute('src','images/crash.png');
var playerProperties = document.getElementsByClassName("player")[0];
document.getElementsByClassName("pitch")[0].style.top=-(pitchLength-1000)+"px";
document.getElementsByClassName("pitch")[0].style.height=pitchLength+"px";
function GameLoop(){
	this.x=0;
	this.element;	
	var that = this;
	this.createOpponent = function(){
		that.element= document.createElement("div");
		that.element.className ="opponent";		
		document.getElementsByClassName("pitch")[0].appendChild(that.element);	
		that.x = getRandom()+130;
		yOpponent = yOpponent+500;
		that.element.style.left = that.x+"px";
		that.element.style.bottom = yOpponent+"px";
		listOfOpponent.push(that.element);
		}
	this.movePitch = function(){
		if(yPlayer<=pitchLength-500){
			var pitch = document.getElementsByClassName("pitch")[0];
			yPitch = yPitch + 10;
			pitch.style.top = yPitch+"px";
			}
		yPlayer = yPlayer + 10; 
		playerProperties.style.bottom = yPlayer+"px";	
		}
	this.collision = function(){	
		var recentOpponentLeft= document.defaultView.getComputedStyle(listOfOpponent[opponentCrossed],null).getPropertyValue("left");	 
		var playerLeft = document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left");
		var recentOpponentBottom = document.defaultView.getComputedStyle(listOfOpponent[opponentCrossed],null).getPropertyValue("bottom");	 
		var playerButtom = document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("bottom");
		var buttomDifference = parseInt(playerButtom)-parseInt(recentOpponentBottom);
		if((parseInt(recentOpponentLeft) == parseInt(playerLeft)) && opponentCrossed!=0 && buttomDifference<120){
			clearInterval(x);
			live = false;
			document.getElementsByClassName("opponent")[opponentCrossed].appendChild(image);
			}
			else if((parseInt(playerButtom)>370 && parseInt(playerButtom)<650 && (parseInt(recentOpponentLeft) == parseInt(playerLeft)))){
				clearInterval(x);	
				live = false;
				document.getElementsByClassName("opponent")[0].appendChild(image);			
				}
			else if(yPlayer==pitchLength-250){
				clearInterval(x);
				live = false;
				image.setAttribute('src','images/winner.png');
				playerProperties.appendChild(image);
				}		
		if(buttomDifference>360)
			opponentCrossed++;
		}
	this.score = function(){
		document.getElementsByClassName("score")[0].innerHTML = yPlayer+250+"  ||  "+-(pitchLength-250 - yPlayer);
		}
		
	this.moveBullet = function(){
		var firedOpponentBottom = document.defaultView.getComputedStyle(listOfOpponent[firedOpponent],null).getPropertyValue("bottom");
		if(bulletBottom-80<parseInt(firedOpponentBottom)){
			bulletBottom = bulletBottom + 20;
			bullet.style.bottom = bulletBottom+"px";
			}
		 else if(bulletBottom > parseInt(firedOpponentBottom)){
			 bulletFired = false;
			 document.getElementsByClassName("pitch")[0].removeChild(bullet);
			 var firedOpponentLeft= parseInt(document.defaultView.getComputedStyle(listOfOpponent[firedOpponent],null).getPropertyValue("left"));
			 var bulletLeft = parseInt(document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left"));	 
			 if(firedOpponentLeft==bulletLeft){
				  var crashedOpponent = document.getElementsByClassName("opponent")[firedOpponent];
				  var crashedOpponentImage = document.createElement("img");
				  crashedOpponentImage.setAttribute('src','images/fired-opponent.png');
				  if(firedOpponentLeft<251)crashedOpponent.style.left = "0px";
				  else crashedOpponent.style.left = "505px";
				  crashedOpponent.appendChild(crashedOpponentImage);
				 }			 
			 }
		}
	}
var x = setInterval(game,50);
function game(){
	var g= new GameLoop();
	if(counter == 20 && listOfOpponent.length<pitchLength/500-1){
		g.createOpponent();
		counter = 0;
		}
	counter++;
	g.movePitch();	
	if(bulletFired == true)
		g.moveBullet();
	if(listOfOpponent.length>=1)
		g.collision();
	g.score();
	}	
	
function getRandom(){
	var rand = Math.floor(Math.random()*3);
	return rand*120;
	}
	
document.getElementById("left").addEventListener("click", moveLeft, false);
	function moveLeft(e){
		var playerLeftPx = document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left");	
			if(playerLeftPx == "250px" && live == true)
				playerProperties.style.left = "130px";
				else if(playerLeftPx == "370px" && live == true)
					playerProperties.style.left = "250px";
		}
document.getElementById("right").addEventListener("click", moveRight, false);
	function moveRight(e){		
		var playerLeftPx = document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left");
			if(playerLeftPx == "250px" && live == true)
				playerProperties.style.left = "370px";
				else if(playerLeftPx == "130px" && live == true)
					playerProperties.style.left = "250px";
		}
window.addEventListener("keydown", movePlayer, false);
	function movePlayer(e){	
		var playerLeftPx = document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left");
		var unicode=e.keyCode? e.keyCode : e.charCode;
		if(unicode==37 && live == true){		
			if(playerLeftPx == "250px")
				playerProperties.style.left = "130px";
				else if(playerLeftPx == "370px")
					playerProperties.style.left = "250px";
			}
			else if(unicode==39 && live == true){
				if(playerLeftPx == "250px")
				playerProperties.style.left = "370px";
				else if(playerLeftPx == "130px")
					playerProperties.style.left = "250px";
				}		
		}
window.addEventListener("keydown", fireOpponent, false);
	function fireOpponent(e){
		var playerButtom = parseInt(document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("bottom"));
		var unicode=e.keyCode? e.keyCode : e.charCode;
		if(unicode==70 && live == true && bulletFiredCount<pitchLength/2500 && playerButtom>500 && bulletFired == false){
			var bulletLeft = parseInt(document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("left"))+37;
			bulletBottom = parseInt(document.defaultView.getComputedStyle(playerProperties,null).getPropertyValue("bottom"))+260;
			bullet = document.createElement("div");
			bullet.className="fire";
			bullet.style.left = bulletLeft+"px";
			bullet.style.bottom = bulletBottom+"px";
			document.getElementsByClassName("pitch")[0].appendChild(bullet);
			bulletFiredCount++;
			bulletFired = true;
			firedOpponent = opponentCrossed +1;
			}
		}