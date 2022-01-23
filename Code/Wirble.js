var word;

var lightTheme;

var darkTheme;

var theme;

var guesses = [];

const maxGuesses = 6;

const wordLength = 5;

var current;

var squareSize;

var buffer;

var keyWidth,keyHeight;

var keyBuffer;

var greens = [];

var yellows = [];

var checked = [];

var wid;

var why;

var notes = [];

var end;

function preload() {
	lightTheme = {mode:"light",
							 	background:color(255),
							 	title:color(26,26,27),
								alt_text:color(255),
							 	line:color(212,214,218),
								keys:color(212,214,218),
							 	buttons:color(136,138,140),
								squares:color(121,124,126),
							 	question:loadImage("Code/Resources/question_light.png"),
								stats:loadImage("Code/Resources/stats_light.png"),
								gear:loadImage("Code/Resources/gear_light.png"),
								back:loadImage("Code/Resources/back_light.png"),
								green:color(121,167,107),
							  yellow:color(198,180,102)};
	
	darkTheme = {mode:"dark",
							background:color(18,18,19),
							title:color(216,218,220),
						  alt_text:color(216,218,220),
							line:color(58,58,60),
						  keys:color(129,131,132),
							buttons:color(86,87,88),
						  squares:color(58,58,60),
							question:loadImage("Code/Resources/question_dark.png"),
							stats:loadImage("Code/Resources/stats_dark.png"),
							gear:loadImage("Code/Resources/gear_dark.png"),
						  back:loadImage("Code/Resources/back_dark.png"),
							green:color(97,139,85),
						  yellow:color(177,159,76)};
}

function setup() {
	theme = lightTheme;
	
	greens = [];

	yellows = [];

	checked = [];
	
	notes = [];
	
	current = 0;
	
	end = false;
	
	createCanvas(windowWidth, windowHeight);
	word = random(choiceList);
	
	if (width > height) {
		wid = height*9/16;
	} else {
		wid = width;
	}
		
	//print("Word is " + word);
	
	guesses = [];
	
	for (let i = 0; i < maxGuesses; i++) {
		guesses[i] = nullArray(wordLength);
	}
	
	keyWidth = height/30;
	keyWidth = (wid)/(10+(10/8))
	
	keyHeight = keyWidth*10/7;

	keyBuffer = keyWidth/8;
	
	why = (wid*0.069)+((height-3*(keyHeight+keyBuffer)-(wid*0.069))/2);

	squareSize = ((height-3*(keyHeight+keyBuffer)-(wid*0.069))/(maxGuesses+(wordLength/10)))*7/8;
	buffer = squareSize/10;
}

function draw() {
	background(theme.background);
	fill(theme.title);
	textSize(squareSize/1.8);
	textStyle(BOLD);
	noStroke();
	text("WIRBLE", width/2-textWidth("WIRBLE")/2, textWidth("M")*1.1);
	stroke(theme.line);
	strokeWeight(1);
	line(width/2-wid/2,textWidth("M")*1.3,width/2+wid/2,textWidth("M")*1.3);
	
	image(theme.question, width/2-wid/2+textWidth("M")/4,(textWidth("M")*1.3)/2-textWidth("M")*1/3, textWidth("M")*2/3, textWidth("M")*2/3);
	image(theme.stats, width/2+wid/2-textWidth("M")*2,(textWidth("M")*1.3)/2-textWidth("M")*1/3, textWidth("M")*2/3, textWidth("M")*2/3);
	image(theme.gear, width/2+wid/2-textWidth("M")*11/12,(textWidth("M")*1.3)/2-textWidth("M")*1/3, textWidth("M")*2/3, textWidth("M")*2/3);
		
	for (let x = 0; x < wordLength; x++) {
		for (let y = 0; y < maxGuesses; y++) {
			fill(0,0,0,0);
			strokeWeight(wid/352.6875);
			stroke(theme.line);
			if (guesses[y][x] != null) {
				stroke(theme.squares);
				if (current > y) {
					fill(theme.squares);
					if (word.includes(guesses[y][x])) {
						stroke(theme.yellow);
						fill(theme.yellow);
						if (word[x] == guesses[y][x]) {
							stroke(theme.green);
							fill(theme.green);
						}
					}
				}	
			}
			square(width/2+x*(squareSize+buffer)-((squareSize+buffer)*wordLength-buffer)/2,why+y*(squareSize+buffer)-((squareSize+buffer)*maxGuesses-buffer)/2, squareSize);
			if (guesses[y][x] != null) {
				fill(theme.title);
				if (current > y) {
					fill(theme.background);
				}	
				noStroke();
				text(guesses[y][x].toUpperCase(), width/2+x*(squareSize+buffer)-((squareSize+buffer)*wordLength-buffer)/2+squareSize/2-textWidth(guesses[y][x].toUpperCase())/2,why+y*(squareSize+buffer)-((squareSize+buffer)*maxGuesses-buffer)/2+(squareSize/2)+(textWidth("M")/2));
			}
		}
	}
	
	for (let i in topRow) {
		noStroke();
		fill(theme.keys);
		if (checked.includes(topRow[i])) {
			fill(theme.squares);
			if (yellows.includes(topRow[i])) {
				fill(theme.yellow);
				if (greens.includes(topRow[i])) {
					fill(theme.green);
				}
			}
		}
		rect(width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*topRow.length-keyBuffer)/2,height-3*(keyHeight+keyBuffer), keyWidth, keyHeight, keyWidth/7);
		textSize(keyWidth/4);
		fill(theme.title);
		if (checked.includes(topRow[i])) {
			fill(theme.alt_text);
		}
		text(topRow[i].toUpperCase(), width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*topRow.length-keyBuffer)/2+keyWidth/2-textWidth(topRow[i].toUpperCase())/2,height-3*(keyHeight+keyBuffer)+textWidth("M")/2+keyHeight/2);
	}
	for (let i in midRow) {
		noStroke();
		fill(theme.keys);
		if (checked.includes(midRow[i])) {
			fill(theme.squares);
			if (yellows.includes(midRow[i])) {
				fill(theme.yellow);
				if (greens.includes(midRow[i])) {
					fill(theme.green);
				}
			}
		}
		rect(width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*midRow.length-keyBuffer)/2,height-2*(keyHeight+keyBuffer), keyWidth, keyHeight, keyWidth/7);
		textSize(keyWidth/4);
		fill(theme.title);
		if (checked.includes(midRow[i])) {
			fill(theme.alt_text);
		}
		text(midRow[i].toUpperCase(), width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*midRow.length-keyBuffer)/2+keyWidth/2-textWidth(midRow[i].toUpperCase())/2,height-2*(keyHeight+keyBuffer)+textWidth("M")/2+keyHeight/2);
	}
	for (let i in botRow) {
		noStroke();
		fill(theme.keys);
		if (checked.includes(botRow[i])) {
			fill(theme.squares);
			if (yellows.includes(botRow[i])) {
				fill(theme.yellow);
				if (greens.includes(botRow[i])) {
					fill(theme.green);
				}
			}
		}
		rect(width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2,height-keyHeight-keyBuffer, keyWidth, keyHeight, keyWidth/7);
		textSize(keyWidth/4);
		fill(theme.title);
		if (checked.includes(botRow[i])) {
			fill(theme.alt_text);
		}
		text(botRow[i].toUpperCase(), width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2+keyWidth/2-textWidth(botRow[i].toUpperCase())/2,height-(keyHeight+keyBuffer)+textWidth("M")/2+keyHeight/2);
	}
	fill(theme.keys);
	rect(width/2-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2-keyWidth*1.5-keyBuffer,height-keyHeight-keyBuffer, keyWidth*1.5, keyHeight, keyWidth/7);
	textSize(keyWidth/4);
	fill(theme.title);
	text("ENTER", width/2-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2-keyWidth*1.5-keyBuffer+keyWidth*1.5/2-textWidth("ENTER")/2,height-keyHeight-keyBuffer+textWidth("M")/2+keyHeight/2);
	
	fill(theme.keys);
	rect(width/2+((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2+keyBuffer,height-keyHeight-keyBuffer, keyWidth*1.5, keyHeight, keyWidth/7);
	image(theme.back,width/2+((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2+keyBuffer+(keyWidth*1.5)/2-(keyHeight/2.4)/2,height-keyHeight-keyBuffer+keyHeight/2-(keyHeight/2.4)/2, keyHeight/2.4, keyHeight/2.4);
	for (let i of notes) {
		i.timer++;
		if (i.timer > 150) {
			notes.splice(notes.indexOf(i), 1)
		}
		fill(red(theme.title),green(theme.title),blue(theme.title), (i.timer > 120 ? 150-i.timer : 30)*(255/30));
		rect(width/2-squareSize, (wid*0.069),squareSize*2,squareSize, squareSize/7);
		
		fill(theme.background);
		textSize(squareSize/6);
		textAlign(CENTER,TOP);
		text(i.text,width/2-squareSize+(squareSize/16),(wid*0.069)+squareSize/4,squareSize*2-(squareSize/8));
		textAlign(LEFT,BASELINE);
	}
}

function inputLetter(letter) {
	for (let i = 0; i < wordLength; i++) {
		if (guesses[current][i] == null) {
			guesses[current][i] = letter;
			break;
		}
	}
}

function enter() {
	if (guesses[current][guesses[current].length-1] != null) {
		let str = "";
		for (let i of (guesses[current])) {
			str = str + i;
		}
		if (wordList.includes(str)) {
			if (check(current)) {
				win();
				current++;
				return;
			}
			if (current+1 >= maxGuesses) {
				current++;
				lose();
				return;
			}
			current++;
		} else {
			notes.push({text:"Not in word list",timer:0});
		}
	} else {
		notes.push({text:"Not enough letters",timer:0});
	}
}

function win() {
	notes.push({text:"You got it!",timer:0});
	end = true;
}

function lose() {
	notes.push({text:"Out of tries \n The word was " + word,timer:0});
	end = true;
}

function check(guess) {
	let str = "";
	for (let x in guesses[guess]) {
		str = str + guesses[guess][x];
		if (!checked.includes(guesses[guess][x])) {
			checked.push(guesses[guess][x]);
		}
		if (word.includes(guesses[guess][x])) {
			if (!yellows.includes(guesses[guess][x])) {
				yellows.push(guesses[guess][x]);
			}
			if (word[x] == guesses[guess][x]) {
				if (!greens.includes(guesses[guess][x])) {
					greens.push(guesses[guess][x]);
				}
			}
		}
	}
	if (word.toLowerCase() === str.toLowerCase()) {
		return true;
	}
	return false;
}

function backspace() {
	if (guesses[current][0] != null) {
		for (let i = 0; i <= wordLength; i++) {
			if (guesses[current][i] == null) {
				guesses[current][i-1] = null;
				break;
			}
		}
	}
}

function keyPressed(event) {
	if (!end) {
		if (letters.includes(event.key)) {
			inputLetter(event.key);
		} else {
			switch (event.key) {
				case "Enter":
					enter();
					break;
				case "Backspace":
					backspace();
					break;
			}
		}
	} else {
		setup();
	}
}

function mouseClicked() {
	if (!end) {
		textSize(squareSize/1.8);
		textStyle(BOLD);
		noStroke();
		if (mouseX > width/2+wid/2-textWidth("M")*11/12 && mouseX < width/2+wid/2-textWidth("M")*11/12+textWidth("M")*2/3) {
			if (mouseY > (textWidth("M")*1.3)/2-textWidth("M")*1/3 && mouseY < (textWidth("M")*1.3)/2-textWidth("M")*1/3+textWidth("M")*2/3) {
				toggleTheme();
			}
		}

		for (let i in topRow) {
			if (mouseX > (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*topRow.length-keyBuffer)/2) && mouseX < (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*topRow.length-keyBuffer)/2)+(keyWidth)) {
				if (mouseY > (height-3*(keyHeight+keyBuffer)) && mouseY < (height-3*(keyHeight+keyBuffer))+(keyHeight)) {
					inputLetter(topRow[i]);
				}
			}
		}
		for (let i in midRow) {
			if (mouseX > (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*midRow.length-keyBuffer)/2) && mouseX < (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*midRow.length-keyBuffer)/2)+(keyWidth)) {
				if (mouseY > (height-2*(keyHeight+keyBuffer)) && mouseY < (height-2*(keyHeight+keyBuffer))+(keyHeight)) {
					inputLetter(midRow[i]);
				}
			}
		}
		for (let i in botRow) {
			if (mouseX > (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2) && mouseX < (width/2+i*(keyWidth+keyBuffer)-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2)+(keyWidth)) {
				if (mouseY > (height-keyHeight-keyBuffer) && mouseY < (height-keyHeight-keyBuffer)+(keyHeight)) {
					inputLetter(botRow[i]);
				}
			}
		}
		if (mouseX > (width/2-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2-keyWidth*1.5-keyBuffer) && mouseX < (width/2-((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2-keyWidth*1.5-keyBuffer)+(keyWidth*1.5)) {
			if (mouseY > (height-keyHeight-keyBuffer) && mouseY < (height-keyHeight-keyBuffer)+(keyHeight)) {
				enter();
			}
		}

		if (mouseX > (width/2+((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2+keyBuffer) && mouseX < (width/2+((keyWidth+keyBuffer)*botRow.length-keyBuffer)/2+keyBuffer)+(keyWidth*1.5)) {
			if (mouseY > (height-keyHeight-keyBuffer) && mouseY < (height-keyHeight-keyBuffer)+(keyHeight)) {
				backspace();
			}
		}
	} else {
		setup();
	}
}

function toggleTheme() {
	if (theme.mode == "dark") {
		theme = lightTheme;
	} else {
		theme = darkTheme;
	}
}

function nullArray(length) {
	var ret = [];
	for (let i = 0; i < length; i++) {
		ret[i] = null;
	}
	return ret;
}


















