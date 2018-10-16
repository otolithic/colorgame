var randocolor1 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
var randocolor2 =[Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];		
var middlecolor = [0,0,0];
var MIN_DIFFERENCE = 20;
		
//prevent too similar colors		
for (x = 0; x < randocolor1.length; x++) {
    while (Math.abs(randocolor1[x] - randocolor2[x]) < MIN_DIFFERENCE)
        {randocolor1[x] = Math.floor(Math.random()*256);}		
}

for (x = 0; x < middlecolor.length; x++) {
    co = (randocolor1[x]-randocolor2[x])/2 + randocolor2[x];
    co = Math.abs(Math.floor(co));
    middlecolor[x] = co;	
}

var hexcolor = ["#", "#", "#"];
//convert these rgb values to hex. [0] and [1] are the two colors and [2] is between them
for (x = 0; x < randocolor1.length; x++) {
    var hex = [randocolor1[x].toString(16), randocolor2[x].toString(16), middlecolor[x].toString(16)];		

    for (y = 0; y < hex.length; y++) {
        if (hex[y].length == 1) {
            hex[y] = "0" + hex[y];	
        }
    }

    for (z = 0; z < hexcolor.length; z++) {
        hexcolor[z] = hexcolor[z].concat(hex[z]);		
    }
}


//populate the hex names and colors generated
function draw() {
  var canvas1 = document.getElementById("colorboxes");
  var h = canvas1.height;
  if (canvas1.getContext) {
    var ctx = canvas1.getContext("2d"); 
      var left = hexcolor[0];
      var middle =  "#000000";
      var right = hexcolor[1];
      
    ctx.fillStyle=left;
    ctx.fillRect(0, 0, h, h);
      
    ctx.fillStyle=middle;
    ctx.fillRect(h,0,h,h);
      
    ctx.fillStyle=right;
    ctx.fillRect(2*h,0,h,h,0);
      
      ctx.fillStyle="white";
      ctx.font = "150px serif";
      ctx.fillText(left,h/2-ctx.measureText(left).width/2,h/2);
      ctx.fillText(middle,1.5*h-ctx.measureText(middle).width/2,h/2);
      ctx.fillText(right,2.5*h-ctx.measureText(right).width/2,h/2);
      
  }
}

//set sliders to 0
	
function getHexColor(r, g, b) {
	var guesshex= "#";
	var hex = 0;
	guess = [r, g, b];
	
	for (x = 0; x< guess.length; x++) {
		hex = (+guess[x]).toString(16);
		if (hex.length == 1)
			hex = "0" + hex;
		guesshex = guesshex.concat(hex);
	}	
	
	return guesshex;
}

function getRGB() {
	var form = document.getElementById("colorpicker");
	var red = form.elements["red"];
	var green = form.elements["green"];
	var blue = form.elements["blue"];

	var rgb = [red.value, green.value, blue.value];
	
	return rgb;
}

function updateColor() {
    
    var form = document.getElementById("colorpicker");
	var redvalue = form.elements["redvalue"];
	var greenvalue = form.elements["greenvalue"];
	var bluevalue = form.elements["bluevalue"];
	
	//var out = form.elements["middlecolorname"];
	var rgb = getRGB();
	
	redvalue.value = rgb[0];
	greenvalue.value = rgb[1];
	bluevalue.value = rgb[2];	
	hexcolor = getHexColor(rgb[0],rgb[1],rgb[2]);
	
    var canvas1 = document.getElementById("colorboxes");
    var h = canvas1.height;
    if (canvas1.getContext) {
        var ctx = canvas1.getContext("2d"); 
        ctx.fillStyle=hexcolor;
        ctx.fillRect(h,0,h,h);
        
        ctx.fillStyle="white";
        ctx.fillText(hexcolor,1.5*h-ctx.measureText(hexcolor).width/2,h/2);
    }
}

function displayResults() {
	var rgb = getRGB();
	var answer = getHexColor(middlecolor[0],middlecolor[1],middlecolor[2]);
	var guess = getHexColor(rgb[0],rgb[1],rgb[2]);
	var resultText = document.getElementById("resultText");
	var resultColor = document.getElementById("resultColor");
	var scoreText = document.getElementById("scoreText");
	var score = document.getElementById("score");
	
	// display the actual middle color and its hex ID
	resultText.style.display = "block";
	resultText.innerHTML = "The correct answer was " + answer + ".";
	resultColor.style.display = "flex";
	resultColor.style.backgroundColor = answer;
	
	// calculate and display the player's score based on their guess
	scoreText.style.display = "block";
	scoreText.innerHTML = "You guessed " + guess + ".<br>The max score is 1000. Your score is: ";
	score.style.display = "block";	
	score.innerHTML = calcScore(middlecolor, rgb);
}

function calcScore(actual, guess) {
	var sumSquares = 0;
	for (x = 0; x<actual.length; x++) {
		sumSquares += Math.pow(actual[x]-guess[x], 2);	
	}
    
    maxdiff = 128^2*3;
    mindiff = 0;
    
    percentmax = Math.sqrt(sumSquares)/maxdiff
    scaledScore = Math.round(1000/(percentmax+1)); 
	return scaledScore;
}
