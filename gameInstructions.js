var background;
var instructionText;

var gameInstructionsState = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    var Instructions_style = { font: 'bold 30px Acme', fill: '#fff'};
     instructionText = this.game.add.text(400, 300, "Fly through space... \nYou must shoot the Prime numbers \nand collect the composite numbers.\n\nUse the Arrow keys to move left and right \nPress space to shoot.", Instructions_style);
    instructionText.anchor.setTo(0.5, 0.5)
    instructionText.fixedToCamera = true;

    // Add menu buttons
    playButton = game.add.button(game.world.centerX + 250, 550, 'playButton', this.actionOnPlayClick, this,2,1,0);
    backButton = game.add.button(game.world.centerX - 350, 550, 'backButton', this.actionOnBackClick, this,2,1,0);

  },

  update: function(){
    background.tilePosition.y += 2;
  },

  actionOnPlayClick: function(){
    game.state.start('play');
  },

  actionOnBackClick: function(){
    game.state.start('learn2');
  }

};
