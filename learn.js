var background;
var text1;

var learnState = {
  create: function(){
      background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
      // Add title
      var title_style = { font: 'bold 25px Acme', fill: '#fff'};
       text1 = this.game.add.text(400, 300, "A prime number (or a prime) is a natural number \ngreater than 1 that has no positive divisors\nother than 1 and itself. For example 3 is a prime number\n as it can only be divided by itself and 1\n\nA natural number greater than 1 that is not a prime number \nis called a composite number. \nAn example of this is 4 as it can be divided by \nitself, 1 AND 2.\n\n The number 1 is not a prime number by definition \n- it has only one divisor.\nThe number 0 is not a prime number, it is not a positive \nnumber and has infinite \nnumber of divisors. ", title_style);
      text1.anchor.setTo(0.5, 0.5)
      text1.fixedToCamera = true;

      // Add menu buttons
      nextButton = game.add.button(game.world.centerX + 150, 550, 'nextButton', this.actionOnNextClick, this,2,1,0);
      menuButton = game.add.button(game.world.centerX - 100, 550, 'menuButton', this.actionOnMenuClick, this,2,1,0);
  },

  update:function(){
    // Scroll background
    background.tilePosition.y +=2;
  },

  actionOnNextClick: function(){
    game.state.start('learn2');
  },

  actionOnMenuClick: function(){
    game.state.start('menu');
  }


};
