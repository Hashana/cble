var background;
var enterKey;
var spaceBar;

var learn5State = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add learning materials
    var title_style = { font: 'bold 26px Acme', fill: '#fff'};
     var text1 = this.game.add.text(400, 300, "Lesson 5.\nThe Prime numbers between 50 - 70 are: \n53,59,61,67,\n\nThe Prime numbers between 70 - 100 are:\n71,73,79,83,89,97\n\n Press Space to go to the game instructions \nor Enter to go back through the lessons ", title_style);
    text1.anchor.setTo(0.5, 0.5)
    text1.fixedToCamera = true;

    // Add menu buttons
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.backScreen, this);

    spaceBar  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.nextScreen, this);

  },

  update: function(){
    background.tilePosition.y +=2;
  },

  nextScreen: function(){
    game.state.start('gameInstructions');
  },

  backScreen: function(){
    game.state.start('learn4');
  }

};
