var background;
var text1;
var enterKey;
var spaceBar;

var learnState = {
  create: function(){
      background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
      // Add title
      var title_style = { font: 'bold 25px Acme', fill: '#fff'};
       text1 = this.game.add.text(400, 300, "Lesson 1.\nA prime number (or a prime) is a natural number \ngreater than 1 that has no positive divisors\nother than 1 and itself.\n\nFor example 3 is a prime number\n as it can only be divided by itself and 1.\n\n Can you think of any others?\n\n Press Space to go to next lesson or Enter to go back", title_style);
      text1.anchor.setTo(0.5, 0.5)
      text1.fixedToCamera = true;

      // Add menu buttons
      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.add(this.backScreen, this);

      spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceBar.onDown.add(this.nextScreen, this);

  },

  update:function(){
    // Scroll background
    background.tilePosition.y +=2;
  },

  nextScreen: function(){
    game.state.start('learn2');
  },

  backScreen: function(){
    game.state.start('menu');
  }


};
