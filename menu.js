var spaceBar;
var enterKey;
var background;


var menuState = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add title
    var title_style = { font: 'bold 100px Acme', fill: '#C390D4'};
    var text = this.game.add.text(400, 100, "Planetary Primes", title_style);
    text.anchor.setTo(0.5, 0.5)

    // Add instructions
    var instructions_style = { font: 'bold 40px Acme', fill: '#fff'};
    var instructions = this.game.add.text(400, 500, "Press Space to visit the \nlearning environment or \nEnter to skip to the game!", instructions_style);
    instructions.anchor.setTo(0.5, 0.5)

      // Add menu buttons
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.playGame, this);

    spaceBar  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.learnScreen, this);
  //  learnButton = game.add.button(game.world.centerX - 50, 400, 'learnButton', this.actionOnLearnClick, this,2,1,0);
  //  playButton = game.add.button(game.world.centerX - 50, 500, 'playButton', this.actionOnPlayClick, this,2,1,0);
  },

  update: function(){
    // Scroll background
    background.tilePosition.y +=1;
  },

  learnScreen: function(){
    game.state.start('learn');
  },

  playGame: function(){
    game.state.start('play');
  }


};
