var background;
var enterKey;
var spaceBar;

var learn3State = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Add learning materials
    var title_style = { font: 'bold 26px Acme', fill: '#fff'};
     var text1 = this.game.add.text(400, 300, "Exceptions.\n\nBeware!\nThe number 1 is not a prime number by definition \nas it can only be divided by itself and not itself AND 1!\n\n\nRemember:\nZero is not a prime or composite number, as it is \nnot a positive number!\n\n Press Space to go to next lesson or Enter to go back ", title_style);
    text1.anchor.setTo(0.5, 0.5)
    text1.fixedToCamera = true;

    // Add menu buttons
    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.backScreen, this);

    spaceBar  = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBar.onDown.add(this.nextScreen, this);
  //  nextButton = game.add.button(game.world.centerX + 250, 550, 'nextButton', this.actionOnNextClick, this,2,1,0);
  //  backButton = game.add.button(game.world.centerX - 350, 550, 'backButton', this.actionOnBackClick, this,2,1,0);
  },

  update: function(){
    background.tilePosition.y +=1;
  },

  nextScreen: function(){
    game.state.start('learn4');
  },

  backScreen: function(){
    game.state.start('learn2');
  }

};
