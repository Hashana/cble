var background;
var enterKey;
var spaceBar;

var learn4State = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add learning materials
    var title_style = { font: 'bold 26px Acme', fill: '#fff'};
     var text1 = this.game.add.text(400, 300, "Prime Numbers.\n\nThe Prime numbers between 0-10 are: \n2,3,5,7 \n\nThe Prime numbers between 10-30 are:\n11,13,17,19,23,29,\n\nThe Prime numbers between 30-50 are: \n31,37,41,43,47\n\n Press Space to go to next lesson or Enter to go back ", title_style);
    text1.anchor.setTo(0.5, 0.5)
    text1.fixedToCamera = true;

    // Add menu buttons
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.backScreen, this);

    spaceBar  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.nextScreen, this);

  },

  update: function(){
    background.tilePosition.y +=1;
  },

  nextScreen: function(){
    game.state.start('learn5');
  },

  backScreen: function(){
    game.state.start('learn3');
  }

};
