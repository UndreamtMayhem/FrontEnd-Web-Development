// build utlity method for colloision
var CollisionDetection = {
    'hasCollided': function(objectA, objectB) {
        if (objectA.x < objectB.x + objectB.width &&
            objectA.x + objectB.width > objectB.x &&
            objectA.y < objectB.y + objectB.height &&
            objectA.height + objectA.y > objectB.y) {
            return true;
        }
    }
}

// Global varibles for CTORS
var playerStartX = 412;
var playerStartY = 380;

var ene1X = -100;
var ene1Y = 50;
var ene1Speed = 25;

var ene2X = -140;
var ene2Y = 135;
var ene2Speed = 105;

var ene3X = -120;
var ene3Y = 225;
var ene3Speed = 35;

var gemBluePoints = 10;
var gemBlueDeath = 500;
var gemBlueSprite = 'images/Gem_Blue_fx.png';

var gemGreenPoints = 10;
var gemGreenDeath = 330;
var gemGreenSprite = 'images/Gem_Green_fx.png';

var gemOrangePoints = 30;
var gemOrangeDeath = 330;
var gemOrangeSprite = 'images/Gem_Orange_fx.png';

/**

 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

/** 
 * @module GameManager 
 * Represents a book.
 * Responsible for Game State
 * StartsScreen, StartGame, StopGame, PauseGame, ResumeGame
 */

var GameManager = function() {
    this.isGameActive = false;
    this.isGameOver = false;
    this.isGamePaused = false;


    /** @function startScreen */
    this.startScreen = function() {
        // Stop enemies
        for (var ene in allEnemies) {
            if (allEnemies.hasOwnProperty(ene)) {
                allEnemies[ene].speed = 0;
            }
        }
        // stop collecteables
        for (var collecta in allCollectables) {
            if (allCollectables.hasOwnProperty(collecta)) {
                allCollectables[collecta].x = -1000;
                allCollectables[collecta].y = -1000;
            }
        }
        // recycled vars consider changing to a generic name
        gameOverLabel.text = 'Start screen';
        gameOverLabel.canvasY = 250;
        pressEnterLabel.text = 'Press Space to start the game';
        pressEnterLabel.canvasY = 200;
    }

    /** @function startGame */
    this.startGame = function() {
        player.lives = 3
        scoreSystem.resetScore()

        // think about using init functions for CTORS
        ene1.x = ene1X
        ene1.y = ene1Y
        ene1.speed = ene1Speed

        ene2.x = ene2X
        ene2.y = ene2Y
        ene2.speed = ene2Speed

        ene3.x = ene3X
        ene3.y = ene3Y
        ene3.speed = ene3Speed

        gemBlue.generatePosition()
        gemBlue.death = gemBlueDeath
        gemGreen.generatePosition()
        gemGreen.death = gemGreenDeath
        gemOrange.generatePosition()
        gemOrange.death = gemOrangeDeath

        // get rid of game over  text
        gameOverLabel.text = ''
        pressEnterLabel.text = ''
    }

    /** @function stopGame */
    this.stopGame = function() {
        // Stop enemies
        for (var ene in allEnemies) {
            if (allEnemies.hasOwnProperty(ene)) {
                allEnemies[ene].speed = 0
            }
            // stop collecteables
            for (var collecta in allCollectables) {
                if (allCollectables.hasOwnProperty(collecta)) {
                    allCollectables[collecta].death = 100000
                    allCollectables[collecta].x = -200
                    allCollectables[collecta].y = -1000
                }
            }
            gameOverLabel.text = 'Game Over'
            pressEnterLabel.text = 'Press Enter to start the game'
        }
    }

    /** @function pauseGame */
    this.pauseGame = function() {
        this.isGameActive = false;
        this.isGamePaused = true;
        // this.pauseCount = 10
        // Stop enemies
        for (var ene in allEnemies) {
            if (allEnemies.hasOwnProperty(ene)) {
                var element = allEnemies[ene];
                element.speed = 0;
            }
        }

        gameOverLabel.text = 'Paused Game';
        pressEnterLabel.text = 'Press Space to resume game';
    }

    /** @function resumeGame */
    this.resumeGame = function() {
        // set the enemies speeds back to what they was
        this.isGameActive = true;
        this.isGamePaused = false;

        ene1.speed = ene1Speed;
        ene2.speed = ene2Speed;
        ene3.speed = ene3Speed;
        // make the labels blanks
        gameOverLabel.text = '';
        pressEnterLabel.text = '';
    }
}

// Global GamemaMager
/** 
 * Instantied GameManager
 * Creates a update function that runs the start screen
 */
var gm = new GameManager()
    /** @function gm.update */
gm.update = function() {
    // if the game isnt active and the game isnt paused 
    // we are at the start screen
    if (!this.isGameActive && !this.isGamePaused) {
        this.startScreen();
    }
}


/**
 * Represents a Enemy.
 * @constructor
 * @param {number} x - The Enemy position x.
 * @param {number} y - The Enemy position y.
 * @param {number} speed - The Enemy speed.
 */
var Enemy = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 50;
        this.height = 50;

        /* The image/sprite for our enemies, this uses
         a helper we've provided to easily load images
        */
        this.sprite = 'images/enemy-bug.png';
    }
    /** 
     * Update the enemy's position, required method for game
     * Parameter: dt, a time delta between ticks
     * @function Enemy.update 
     */
Enemy.prototype.update = function(dt) {
    /* You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers. 
     */
    this.x += dt * this.speed;

    /* if enemy walks of the screen spawn him back on */
    if (this.x > 500) {
        this.x = -155;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Enemy.prototype.checkCollisions = function() {
    if (CollisionDetection.hasCollided(this, player)) {
        // On hit take a life
        player.lives -= 1;
        // reset players position
        player.x = 250;
        player.y = 400;
    }
}


/**
 * Represents a Label GUI.
 * @constructor
 * @param {string} font - The font size and type e.g. 19px Arial.
 * @param {string} txtColor - The text color.
 * @param {string} text - The Text.
 * @param {number} canvasX - The x position on canvas.
 * @param {number} canvasY - The y position on canvas.
 * @param {function} setScore - The y position on canvas.
 */

var label = function(font, txtColor, text, canvasX, canvasY) {
    this.font = font;
    this.txtColor = txtColor
    this.text = text;
    this.score = 0;

    /** 
     * @function setScore
     * @param {number} newScore
     */
    this.setScore = function(newScore) {
        return this.score += newScore;
    }

    /** 
     * @function resetScore
     */
    this.resetScore = function() {
        return this.score = 0;
    }
    this.canvasX = canvasX;
    this.canvasY = canvasY;
}

label.prototype.update = function(dt) {}

// Created a label for lives 
var livesLabel = new label('19px Arial', 'Black', 'Lives:', 429, 82)
livesLabel.x = 380;
livesLabel.y = 32;
livesLabel.sprite = 'images/Heart_fx.png';

/* 
 * Render lives label to the screen 
 * Draws image to canvas
 * Sets canvas font
 * Sets fill style
 * Sets fill text
 */
livesLabel.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = this.font;
    ctx.fillStyle = this.txtColor;
    ctx.fillText(this.text + ' ' + player.lives, this.canvasX, this.canvasY);
}



// Created a label for Game Over 
var gameOverLabel = new label('40px Arial', 'Black', '', 150, 450);
/* 
 * Render game over label to the screen 
 * Draws image to canvas
 * Sets canvas font
 * Sets fill style
 * Sets fill text
 */
gameOverLabel.render = function() {
    ctx.font = this.font;
    ctx.fillStyle = this.txtColor;
    ctx.fillText(this.text, this.canvasX, this.canvasY);
}


// Created a label for Enter Key 
var pressEnterLabel = new label('36px Arial', 'Black', '', 10, 400);
/* 
 * Render Enter Key label to the screen 
 * Draws image to canvas
 * Sets canvas font
 * Sets fill style
 * Sets fill text
 */
pressEnterLabel.render = function() {
        ctx.font = this.font;
        ctx.fillStyle = this.txtColor;
        ctx.fillText(this.text, this.canvasX, this.canvasY);
    }
    // Created a label for scoreSystem
var scoreSystem = new label('19px Arial', 'Black', 'Score:', 10, 80);
/* 
 * Render scoreSystem label to the screen 
 * Draws image to canvas
 * Sets canvas font
 * Sets fill style
 * Sets fill text
 */
scoreSystem.render = function() {
    ctx.font = this.font;
    ctx.fillStyle = this.txtColor;
    ctx.fillText(this.text + ' ' + this.score, this.canvasX, this.canvasY);
}

/*  
    Add more collectables: powerups
*/

/**
 * Represents a Collectable.
 * Chooses a random x coordinate and y coordinate to place 
 * collectible.
 * Then generate a position.
 * The collectable spawnrate is  
 * @constructor
 * @param {string} points - The font size and type e.g. 19px Arial.
 * @param {boolean} death - The determines if sprite is alive to be collected.
 * @param {object} sprite - The sprite image for the collectable.
 */
var Collectable = function(points, death, sprite) {
    this.x = (Math.random() * 416);
    this.y = Math.random() * 300 + 42;
    this.points = points;
    this.lifeStart = 0;
    // death rate = how fast it spawns
    this.death = death;
    this.generatePosition = function(x, y) {
        this.x = (Math.random() * 416);
        this.y = Math.random() * 300 + 42;
    }
    var counter = 0;
    this.spawnRate = function() {
        if (counter < this.death) {
            counter += 1;
        } else {
            counter = 0;
            this.generatePosition();
        }

        return counter;
    }
    this.width = 30;
    this.height = 30;
    this.sprite = sprite;
}


/* Created collectables and stored in an array */
var gemBlue = new Collectable(gemBluePoints, gemBlueDeath, gemBlueSprite);
var gemGreen = new Collectable(gemGreenPoints, gemGreenDeath, gemGreenSprite);
var gemOrange = new Collectable(gemOrangePoints, gemOrangeDeath, gemOrangeSprite);
var allCollectables = [gemBlue, gemGreen, gemOrange];



/**
 * Collectable
 *  @function checkCollisions */
Collectable.prototype.checkCollisions = function() {
    if (CollisionDetection.hasCollided(this, player)) {
        scoreSystem.setScore(this.points);
        // Generate a new position after collectiable hit
        this.generatePosition();
    }
}

/** 
 * Collectable
 * @function update */
Collectable.prototype.update = function(dt) {
        // spawn Gem only when game is active 
        if (gm.isGameActive) {
            this.spawnRate();
        }
    }
    /** 
     * Collectable
     * @function render */
Collectable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}




/**
 * Represents a Selector.
 * allows player to select a character at main screen 

 * @constructor
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 */
var Selector = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Selector.png';
    this.checkX = function() {
        if (this.x > 300) {
            this.x = 100;
        } else if (this.x < 100) {
            this.x = 300;
        }
    }
}

var characterSelector = new Selector(200, 380)

/** 
 * characterSelector
 * @function update 
 */
characterSelector.update = function() {
        this.checkX();
        player.setSprite();
    }
    /** 
     * characterSelector
     * @function render 
     */
characterSelector.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



/**
 * Represents a character.
 * allows player to select a character at main screen 
 * @constructor
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 * @param {object} y - The sprite.
 */
var character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

/** 
 * character
 * @function update 
 */
character.prototype.update = function() {}
    /** 
     * character
     * @function render 
     */
character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


/*
 * Create game characters
 * and add them to an array
 *
 */
var charBoy = new character(100, 350, 'images/char-boy.png');
var charCat = new character(200, 350, 'images/char-cat-girl.png');
var charPrincess = new character(300, 350, 'images/char-princess-girl.png');
var allCharacters = [charBoy, charCat, charPrincess];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * Represents a Player.
 * allows player to select a character at main screen 
 * @constructor
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 */

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = '';
    this.setSprite = function() {
        if (characterSelector.x == 100) {
            this.sprite = 'images/char-boy.png';
        } else if (characterSelector.x == 200) {
            this.sprite = 'images/char-cat-girl.png';
        } else if (characterSelector.x == 300) {
            this.sprite = 'images/char-princess-girl.png';
        }
    }
    this.width = 50;
    this.height = 50;
    this.lives = 3;
    this.isPlayerDead = function() {
        if (this.lives <= 0) {
            return true;
        }
    }
    this.moveUp = function() {
        this.y -= 15;
    }
    this.moveDown = function() {
        this.y += 15;
    }
    this.moveLeft = function() {
        this.x -= 15;
    }
    this.moveRight = function() {
        this.x += 15;
    }
    this.checkUpBound = function() {
        if (this.y < 15) {
            this.y = 12;
        }
    }
    this.checkDownBound = function() {
            if (this.y > 430) {
                this.y = 429;
            }
        }
        // check down movement
    this.checkLeftBound = function() {
        if (this.x < -19) {
            this.x = -18;
        }
    }
    this.checkRightBound = function() {
        if (this.x > 412) {
            this.x = 412;
        }
    }
}

// Created a new player
var player = new Player(playerStartX, playerStartY)


player.update = function(dt) {
    // checkScreen bounds
    this.checkUpBound();
    this.checkDownBound();
    this.checkLeftBound();
    this.checkRightBound();

    // check if player is dead
    if (this.isPlayerDead(player.lives)) {
        gm.stopGame();
    }
}

player.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.handleInput = function(buttonPressed) {
    if (!this.isPlayerDead(player.lives) && gm.isGameActive) {
        if (buttonPressed === 'up') {
            this.moveUp();
        } else if (buttonPressed === 'down') {
            this.moveDown();
        } else if (buttonPressed === 'left') {
            this.moveLeft();
        } else if (buttonPressed === 'right') {
            this.moveRight();
        }
    }
}

gm.handleInput = function(buttonPressed) {
    if (gm.isGameActive) {
        if (buttonPressed == 'space') {
            gm.pauseGame();
        }
    } else if (gm.isGamePaused) {
        if (buttonPressed == 'space') {
            gm.resumeGame();
        }
    }
    if (player.isPlayerDead(player.lives)) {
        if (buttonPressed === 'enter') {
            gm.startGame();
        }
    }
    //Start screen character selection
    else if (!gm.isGameActive && !gm.isGamePaused) {
        player.x = 10000;
        if (buttonPressed == 'left') {
            characterSelector.x -= 100;
        } else if (buttonPressed == 'right') {
            characterSelector.x += 100;
        } else if (buttonPressed == 'space') {
            charBoy.y = 1000;
            charCat.y = 1000;
            charPrincess.y = 1000;
            gm.startGame();
            gm.isGameActive = true;
            characterSelector.y = 1000;
        }
    }
}

// Place all enemy objects in an array called allEnemies
// Set enemy position correctly
var ene1 = new Enemy(ene1X, ene1Y, ene1Speed);
var ene2 = new Enemy(ene2X, ene2Y, ene2Speed);
var ene3 = new Enemy(ene3X, ene3Y, ene3Speed);
var allEnemies = [ene1, ene2, ene3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    }
    player.handleInput(allowedKeys[e.keyCode]);
    gm.handleInput(allowedKeys[e.keyCode]);
})