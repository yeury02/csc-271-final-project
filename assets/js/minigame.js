var currentScene = 0;
var rNum = round(random(-0.5, 4.5)); //randomizes bunny spawn after clicked
var stillPlaying = false;
var level = 1; //keeps track of level/difficulty
var levelCondition = [false, false, false, false]; //array that holds boolean values to let the program know that the code activated each level once already
var gameTime;//keeps track of total time in the khan window
var elapsedTime;//keeps track of time spent on the start screen
var startTime;//timer in game
var stopTime;//value that keeps the value of start time at the moment the game ends

//array for the bunny spawn locations
var LOCATIONS = [{x: -485, y: 185}, {x: 165, y: -490}, {x: 822, y: 185}, {x: 165, y: 870}];

var Carrot = function(x, y)
{
    this.x = x;
    this.y = y;
};

//fuction that draws carrot
Carrot.prototype.draw = function() {
    //carrot
    noStroke();
    fill(123, 255, 0);
    triangle(this.x + 90, this.y + 60, this.x + 110, this.y + 60, this.x + 100, this.y + 80);
    fill(255, 132, 0);
    triangle(this.x + 80, this.y + 75, this.x + 120, this.y + 75, this.x + 100, this.y + 125);
};

//creates the carrot object used for the game
var gameCarrot = new Carrot(100, 108);

var Bunny = function(config)
{
    this.x = config.x;
    this.y = config.y;
    this.h = config.h;
    this.eyeSize = config.eyeSize || 100;
    this.eyeColor = config.eyeColor || color(0, 0, 0);
    this.smile = config.smile || false;
    this.speedX = config.speedX || 0;
    this.speedY = config.speedY || 0;
};

Bunny.prototype.draw = function()
{
    fill(255, 255, 255);
    stroke(0, 0, 0);
    ellipse(this.x + (this.h * 60/100), this.y - (this.h * 30/100), this.h * 60/100, this.h * 120/100);  // left ear
    ellipse(this.x + (this.h * 140/100), this.y - (this.h * 30/100), this.h * 60/100, this.h * 120/100);  // right ear

    ellipse(this.x + (this.h * 100/100), this.y + (this.h * 70/100), this.h * 150/100, this.h * 150/100);    // face

    fill(this.eyeColor);
    ellipse(this.x + (this.h * 70/100), this.y + (this.h * 50/100), this.eyeSize * 17/100, this.eyeSize * 17/100);  // left eye
    ellipse(this.x + (this.h * 130/100), this.y + (this.h * 50/100), this.eyeSize * 17/100, this.eyeSize * 17/100);  // right eye

    line(this.x + (this.h * 65/100), this.y + (this.h * 100/100), this.x + (this.h * 135/100), this.y + (this.h * 100/100));   // mouth
    if (this.smile === true)
    {
        fill(255, 255, 255);
        arc(this.x + (this.h * 70/100), this.y + (this.h * 81/100), this.h * 45/100, this.h * 40/100, 85, 180); //left smile
        arc(this.x + (this.h * 135/100), this.y + (this.h * 81/100), this.h * 45/100, this.h * 40/100, 0, 95);  //right smile
    }

    noFill();
    rect(this.x + (this.h * 85/100), this.y + (this.h * 100/100), this.h * 15/100, this.h * 22/100); // left tooth
    rect(this.x + (this.h * 100/100), this.y + (this.h * 100/100), this.h * 15/100, this.h * 22/100); // right tooth
};

//get bunny to move positions
Bunny.prototype.handleClick = function()
{
    //checks if mouse is clicked in the bunny boundaries
    if (mouseX >= this.x + 6 && mouseX <= this.x + 64 && mouseY >= this.y - 34 && mouseY <= this.y + 53)
    {
        rNum = round(random(-0.5, 4.5));

        //when the bunny is clicked, it goes to a random spawn point in the array LOCATIONS
        this.x = LOCATIONS[rNum].x;
        this.y = LOCATIONS[rNum].y;
    }
};

Bunny.prototype.eatCarrot = function()
{
    if ((this.x + 8 <= gameCarrot.x + 105 && this.x + 62 >= gameCarrot.x + 90) && (this.y - 32 <= gameCarrot.y + 105 && this.y + 51 >= gameCarrot.y + 75))
    {
        currentScene = 2;
        stillPlaying = false;
        stopTime = startTime;
    }
};

Bunny.prototype.movement = function()
{

    //conditions that check bunnies' x or y positions to change their speed directions
    if(this.x + 66 < 0)
    {
        if (level < 5)
            {
                this.speedX = random(1, 3);
                this.speedY = 0;
            }
            else
            {
                this.speedX = random(2, 5);
                this.speedY = 0;
            }
        }
        else if (this.x + 4 > 400)
        {
            if (level < 5)
            {
                this.speedX = random(-3, -1);
                this.speedY = 0;
            }
            else
            {
                this.speedX = random(-5, -2);
                this.speedY = 0;
            }
        }
        else if (this.y + 55 < 0)
        {
            if (level < 5)
            {
                this.speedY = random(1, 3);
                this.speedX = 0;
            }
            else
            {
                this.speedY = random(2, 5);
                this.speedX = 0;
            }
        }
        else if (this.y - 36 > 400)
        {
            if (level < 5)
            {
                this.speedY = random(-3, -1);
                this.speedX = 0;
            }
            else
            {
                this.speedY = random(-5, -2);
                this.speedX = 0;
            }
        }
};

//an array that holds Bunny objects
var gameBunnies = [];

//makes bunny object for the Start Screen and Game Over screen
var screenBunny = new Bunny({ x: 125, y: 175, h: 90, eyeSize: 325, eyeColor: color(143, 13, 24), smile: true });

//Khan button class
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 205;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

//draws button
Button.prototype.draw = function() {
    fill(255, 170, 0);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

//checks if the mouse is inside of the button coordinates when clicked
Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

//clicks inside
Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};

//creates the start button object
var startButton = new Button({
    x: 150,
    y: 325,
    width: 135,
    label: "Start Game",
    onClick: function() {
        currentScene = 1;
        elapsedTime = gameTime;//sets elapsed time to value of gameTime at the moment of click
        stillPlaying = true;
    }
});

//creates the start button object
var restartButton = new Button({
    x: 250,
    y: 325,
    width: 135,
    label: "Back to Start",
    onClick: function() {
        currentScene = 0;
    }
});

mouseClicked = function() {
    if (currentScene === 0){
       startButton.handleMouseClick();
    }
    else if (currentScene === 1)
    {
        //goes through the gameBunnies array to check if the bunny is clicked
        for (var j = 0; j < gameBunnies.length; j++)
        {
            gameBunnies[j].handleClick();
        }
    }
    else if (currentScene === 2)
    {
        restartButton.handleMouseClick();
    }
};

//function that draws the Start screen
var startScreen = function()
{
    background (56, 56, 56);
    screenBunny.draw();
    fill(0, 255, 81);
    textSize(30);
    text ("Bad Bunny", 135, 5);
    textSize(15);
    text("click the bunnies to keep the bunnies away from the carrot", 5, 50);
    text("by Joseph Carasco", 5, 200);
    text("by Evan Russell", 285, 200);
    startButton.draw();
};

//function that draws the Game Screen
var gameScreen = function()
{
    //timer
        startTime = floor(millis()/1000) - elapsedTime; //starts the timer at zero at the moment when the start button is clicked
        textSize(20);
        fill(255, 255, 255);
        text("Time: " + startTime, 300, 20);

    background(0, 0, 0);

    //carrot
    gameCarrot.draw();

    //level display
    textSize(20);
    fill(255, 255, 255);
    text("Level: " + level, 5, 20);
    text("Time: " + startTime, 300, 20);

    if (startTime === 10)
    {
        level = 2;
    }
    else if (startTime === 20)
    {
        level = 3;
    }
    else if (startTime === 30)
    {
        level = 4;
    }
    else if (startTime === 40)
    {
        level = 5;
    }

    //conditions that check the levels to add the bunnies
    if (level === 1 && levelCondition[0] === false)
    {
        //Pushes a Bunny object in the gameBunnies array
        gameBunnies.push(new Bunny({ x: LOCATIONS[0].x, y: LOCATIONS[0].y, h: 35, eyeSize: 50 }));
        levelCondition[0] = true;
    }
    else if (level === 2 && levelCondition[1] === false)
    {
        //Pushes a Bunny object in the gameBunnies array
        gameBunnies.push(new Bunny({ x: LOCATIONS[1].x, y: LOCATIONS[1].y, h: 35, eyeSize: 50 }));
        levelCondition[1] = true;
    }
    else if (level === 3 && levelCondition[2] === false)
    {
        //Pushes a Bunny object in the gameBunnies array
        gameBunnies.push(new Bunny({ x: LOCATIONS[2].x, y: LOCATIONS[2].y, h: 35, eyeSize: 50 }));
        levelCondition[2] = true;
    }
    else if (level === 4 && levelCondition[3] === false)
    {
        //Pushes a Bunny object in the gameBunnies array
        gameBunnies.push(new Bunny({ x: LOCATIONS[3].x, y: LOCATIONS[3].y, h: 35, eyeSize: 50 }));
        levelCondition[3] = true;
    }

    //for loop that goes through the gameBunnies array
    for (var i = 0; i < gameBunnies.length; i++)
    {
        //draws all the bunnies
        gameBunnies[i].draw();
        gameBunnies[i].movement();

        //increments the x and y values of the gameBunnies
        if (stillPlaying)
        {
            gameBunnies[i].x += gameBunnies[i].speedX;
            gameBunnies[i].y += gameBunnies[i].speedY;
        }

        gameBunnies[i].eatCarrot();
    }
};

//function that draws the Game Over screen
var gameOverScreen = function()
{
    //resets all values to how they were originally
    gameBunnies = [];
    level = 1;
    levelCondition = [false, false, false, false];

    background(0, 0, 0);
    screenBunny.draw();
    fill(255, 132, 0);
    textSize(50);
    text("GAME OVER", 50, 10);
    textSize(14);
    text("The bunnies ate your only food. Now you will starve to death lol", 5, 70);
    textSize(20);
    text("You lasted " + stopTime + " seconds.", 25, 340);
    restartButton.draw();
};

draw = function() {
    if (currentScene === 0)
    {
        gameTime = floor(millis()/1000); //sets gameTime to seconds since khan started
        startScreen();
    }
    else if (currentScene === 1)
    {
        gameScreen();
    }
    else if (currentScene === 2)
    {
        gameOverScreen();
    }
};

//code Luis got that lets processing.js library be used on html
var canvas = document.getElementById("mycanvas");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
