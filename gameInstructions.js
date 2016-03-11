var background;
var instructionText;
var enterKey;
var spaceBar;

var gameInstructionsState = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    var Instructions_style = { font: 'bold 26px Acme', fill: '#fff'};
     instructionText = this.game.add.text(400, 300, "Fly through space... \nYou must shoot the Prime numbers \nand collect the composite numbers.\n\n If you shoot a Composite number you lose \npoints! Collect a Prime and you will explode! \n\nUse the Arrow keys to move left and right \nPress space to shoot...\n\n\n Press Space to start the game \nor Enter to go back through the lessons", Instructions_style);
    instructionText.anchor.setTo(0.5, 0.5)
    instructionText.fixedToCamera = true;

    // Add menu buttons
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.backScreen, this);

    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.playScreen, this);

  },

  update: function(){
    background.tilePosition.y += 2;
  },

  playScreen: function(){
    game.state.start('play');
  },

  backScreen: function(){
    game.state.start('learn2');
  }

};
