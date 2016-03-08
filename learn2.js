var background;

var learn2State = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add learning materials
    var title_style = { font: 'bold 26px Acme', fill: '#fff'};
     var text1 = this.game.add.text(400, 300, "The Prime numbers between 0-10 are: \n2,3,5,7 \n\nThe Prime numbers between 10-30 are:\n11,13,17,19,23,29,\n\nThe Prime numbers between 30-50 are: \n31,37,41,43,47\n\nThe Prime numbers between 50 - 70 are: \n53,59,61,67,\n\nThe Prime numbers between 70 - 100 are:\n71,73,79,83,89,97", title_style);
    text1.anchor.setTo(0.5, 0.5)
    text1.fixedToCamera = true;

    // Add menu buttons
    nextButton = game.add.button(game.world.centerX + 250, 550, 'nextButton', this.actionOnNextClick, this,2,1,0);
    backButton = game.add.button(game.world.centerX - 350, 550, 'backButton', this.actionOnBackClick, this,2,1,0);
  },

  update: function(){
    background.tilePosition.y +=2;
  },

  actionOnNextClick: function(){
    game.state.start('gameInstructions');
  },

  actionOnBackClick: function(){
    game.state.start('learn');
  }


};
