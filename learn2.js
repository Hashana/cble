var background;
var text1;
var enterKey;
var spaceBar;

var learn2State = {
  create: function(){
   background = game.add.tileSprite(0, 0, 800, 600, 'starfield');


    // Add learning materials
    var title_style = { font: 'bold 26px Acme', fill: '#fff'};
     var text1 = this.game.add.text(400, 300, "What is a Composite number?\n\nA natural number greater than 1 that is not a prime number \nis called a composite number. \n\nAn example of this is 4 as it can be divided by \nitself, 1 AND 2.\n\n Can you think of any others?\n\n Press Space to go to next lesson or Enter to go back ", title_style);
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
    game.state.start('learn3');
  },

  backScreen: function(){
    game.state.start('learn');
  }


};
