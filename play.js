var background;
var player;
var cursors;
var ACCELERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;
var bank;
var shipTrail;
var bullets;
var fireButton;
var bulletTimer = 0;
var score;
var scoreText;
var scoreText_style;
var allNumbers;
var gameTimer;
var counter = 0;
var sounds = {};
var endKey;
var backgroundSound;
var numbersMissed = 0;

var playState = {
  create: function(){
    // Add background image as a tileSprite
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    score = 0;
    scoreText_style = { font: 'bold 32px Acme', fill: '#fff'};
    scoreText = game.add.text(16, 16, 'Score: ' + score, scoreText_style);
    scoreText.fixedToCamera = true;

    // Add bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // Add player
    player = game.add.sprite(400,500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    // Enable physics for player
    game.physics.enable(player, Phaser.Physics.ARCADE);
    // Make ships movement smoother
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);

    // Add game controls
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    endKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    // Add sounds
    sounds.explosionSfx = game.add.audio('explosion');
    sounds.pickUpSfx = game.add.audio('pickUp');
    sounds.wrongPickupSfx = game.add.audio('wrong');
    sounds.volume = 0.2
    backgroundSound = game.add.audio('music');
    backgroundSound.loop = true;
    backgroundSound.play('');

    // Add trail effect to ship
    shipTrail = game.add.emitter(player.x, player.y + 10, 400);
    shipTrail.width = 10;
    shipTrail.makeParticles('bullet');
    shipTrail.setXSpeed(30, -30);
    shipTrail.setYSpeed(200, 180);
    shipTrail.setRotation(50, -50);
    shipTrail.setAlpha(1, 0.01, 800);
    shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    shipTrail.start(false, 5000, 10);

    //Create group to hold number 1 - 100
    allNumbers = game.add.group();
    allNumbers.enableBody = true;
    allNumbers.physicsBodyType = Phaser.Physics.ARCADE;

    gameTimer = game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, this.dropNumber, this);

  },

  update: function(){
    // Scroll background
    background.tilePosition.y +=2;
    //Check for collision between bullets and numbers
    game.physics.arcade.overlap(bullets, allNumbers, this.checkNumber, null, this);
    //Check for collision between bullets and numbers
    game.physics.arcade.overlap(player, allNumbers, this.collectNumber, null, this);
    this.updateScore();
    // Check for numbers that are missed by player
    this.checkForOutOfBoundsNumbers();

    // Reset player then check if and which movement keys are being pressed
    player.body.acceleration.x = 0;

    if(cursors.left.isDown){
      player.body.acceleration.x = -ACCELERATION;
    }
    else if(cursors.right.isDown){
      player.body.acceleration.x = ACCELERATION;
    }

    // Stop ship going off screen
    if (player.x > game.width - 50){
      player.x = game.width - 50;
      player.body.acceleration.x = 0;

    }
    if(player.x < 50){
      player.x = 50;
      player.body.acceleration.x = 0;
    }

    // // Apply banking effect to ship movement
    // bank = player.body.velocity.x / MAXSPEED;
    // player.scale.x = 1 - Math.abs(bank) / 2;
    // player.angle = bank * 30;

    // Keep the trail in line with the ship
    shipTrail.x = player.x;

    // Check for bullets being fired
    if(fireButton.isDown)
    this.fireBullet();


  },

  render: function(){

  },

  fireBullet: function(){
    //prevent bullets being fired too quickly
    if(game.time.now > bulletTimer){
      var BULLET_SPEED = 400;
      var BULLET_SPACING = 250;
      var bullet = bullets.getFirstExists(false);

      if(bullet){
       // Allow bullet to leave top of ship at a right angle
       var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
       bullet.reset(player.x + bulletOffset, player.y);
       bullet.angle = player.angle;
       game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
       bullet.body.velocity.x += player.body.velocity.x;
       bulletTimer = game.time.now + BULLET_SPACING;
      }
    }


},


// Method to check if number is a prime number
checkIfPrime: function(number){
  var isPrime = true;
  // return false if number is 1
  if(number == 1 ){
    return false;
  }
  // check if number is 2, if so return true
  if(number == 2){
    // number
    return true;
  }
  // Check that it is a whole number
  if (number != Math.round(number)){
    return false
  }
  //Check if there are any factors of number
  for (var i = 2; i <= Math.sqrt(number); i++){
      if (number % i == 0) {isPrime = false}
   }
   return isPrime;
},

createPrime: function(min, max){
  var primeFound = false;
  while(primeFound == false){
    var number = Math.floor(Math.random() * (max - min) + min);
    if(this.checkIfPrime(number)){
      primeFound = true;
    }
  }
  return number;

},

createComposite: function(min, max){
  var compositeFound = false;
  while(compositeFound == false){
    var number = Math.floor(Math.random() * (max - min) + min);
    if(this.checkIfPrime(number) == false){
      compositeFound = true;
    }
  }
  return number;

},

dropNumber: function(){
  // create a random number, if its 5 or less create a prime
  //else create a composite number to drop
  var chooseNumber = Math.floor(Math.random()* (10 - 1) + 1);
  if (chooseNumber <= 5){
    var gamePoint = this.checkGamePoint();
    var numToDrop = this.createPrime(1,gamePoint);
    var number = allNumbers.create(Math.floor(Math.random()* 780), - 50, 'numbers', numToDrop - 1);
    number.prime = true;
    number.value = numToDrop;
    number.body.velocity.y = 150;
    number.anchor.setTo(0.5, 0.5);
  }
  else{
    var gamePoint = this.checkGamePoint();
    var numToDrop = this.createComposite(1,gamePoint);
    var number = allNumbers.create(Math.floor(Math.random()* 780), - 50, 'numbers', numToDrop - 1);
    number.prime = false;
    number.value = numToDrop;
    number.body.velocity.y = 150;
    number.anchor.setTo(0.5, 0.5);
  }
  counter++;

},

collectNumber: function(player, number){
  if(number.prime == false){
    //Number is not prime - add to score
    score += parseInt(number.value);
    // Remove  number and play sound effect
    sounds.pickUpSfx.play('');
    number.kill();
  }
  else{
    if(score - parseInt(number.value) < 1){
      score = 0;
    }
    else{
      score -= parseInt(number.value);
    }
    // Remove player and number - show explosion
    this.explosion(player, number);
    number.kill();
  }
},

checkForOutOfBoundsNumbers: function(){
  allNumbers.forEach(function(number){
    if(number.body.position.y > game.world.height){
      numbersMissed ++;
      if(numbersMissed == 3){
        playState.messageText('You have missed 3 numbers');

      }
      else{
        playState.messageText('You missed a number! \nMiss 3 & your ship will explode!');
        score -= parseInt(number.value);

      }
      number.destroy();
    }
  });

},

explosion: function(player, number){
//Add sound effect
sounds.explosionSfx.play();
// Add explosion for death animation
var explosion = this.game.add.sprite(player.body.x, player.body.y, 'explosion');
explosion.anchor.setTo(0.5,0.5);
explosion.animations.add('explode' ,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 10 ,true);
explosion.animations.play("explode", 10, false);
player.kill();
this.messageText(number.value + ' is a prime number!');
// stop music
backgroundSound.stop();
// Call end state
this.gameOver();
},

actionOnNextClick: function(){
  game.state.start('gameOver');
},

// Method to return the factors of a composite number.
findFactors: function(number){
  var factorString = "1";
  for(var x = 2; x <= parseInt(number.value); x++){
    if(parseInt(number.value) % x == 0){
      factorString += ", " + x;
    }
  }
  return factorString;
},

gameOver: function(){
  game.time.events.remove(gameTimer);
  // Add menu buttons
var  nextButton = game.add.button(game.world.centerX - 50, 500, 'nextButton', this.actionOnNextClick, this,2,1,0);

},

messageText: function(text){
  var Instructions_style = { font: 'bold 30px Acme', fill: '#fff'};
  var instructionText = this.game.add.text(400, 300, text, Instructions_style);
  instructionText.anchor.setTo(0.5, 0.5)
  instructionText.fixedToCamera = true;
  game.add.tween(instructionText).to({alpha: 0}, 2300, Phaser.Easing.Linear.None, true);
},

// check many numbers have been dropped
//set max value accordingly
checkGamePoint: function(){
  if(counter < 10){
    return 10;
  }
  else if(counter < 20){
    return 20;
  }
  else if(counter < 30){
    return 30;
  }
  else if(counter < 40){
    return 40;
  }
  else if(counter < 50){
    return 50;
  }
  else if(counter < 60){
    return 60;
  }
  else if(counter < 70){
    return 70;
  }
  else if(counter < 80){
    return 80;
  }
  else if(counter < 90){
    return 90;
  }
  else{
    return 100;
  }
},

// Method to check if number shot is prime or not
checkNumber: function(bullet, number){
  if(number.prime == true){
    //Number is prime - add to score
    score += parseInt(number.value);
    // Remove bullet and number - lay sound effect.
    sounds.pickUpSfx.play('');
    bullet.kill();
    number.kill();
  }
  // number is composite remove from score
  else{
    if(score - parseInt(number.value) < 1){
     // score - number would be less that 0, set score to 0
     score = 0;
     // Remove bullet and number - play sound effect
     sounds.wrongPickupSfx.play('');
     bullet.kill();
     number.kill();

   }
   else{
     score -= parseInt(number.value);
     // Remove bullet and number - play sound effect
     sounds.wrongPickupSfx.play('');
     bullet.kill();
     number.kill();
   }
   if(parseInt(number.value) == 1){
      this.messageText('1 is not a Prime number!');
   }
   else{
     var factors = this.findFactors(number);
     this.messageText('You have shot down a Composite number! \n' + number.value + ' can be divisible by: \n' +factors +'');
   }


  }

},

updateScore: function(){
  scoreText.setText('Score: ' + score);
}


};
