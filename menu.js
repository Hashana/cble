var learnButton;
var playKey;
var background;

var menuState = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add title
    var title_style = { font: 'bold 100px Acme', fill: '#C390D4'};
    var text = this.game.add.text(400, 100, "Planetary Primes", title_style);
    text.anchor.setTo(0.5, 0.5)

    // Add menu buttons
    learnButton = game.add.button(game.world.centerX - 50, 400, 'learnButton', this.actionOnLearnClick, this,2,1,0);
    playButton = game.add.button(game.world.centerX - 50, 500, 'playButton', this.actionOnPlayClick, this,2,1,0);
  },

  update: function(){
    // Scroll background
    background.tilePosition.y +=2;
  },

  actionOnLearnClick: function(){
    game.state.start('learn');
  },

  actionOnPlayClick: function(){
    game.state.start('play');
  }


};
