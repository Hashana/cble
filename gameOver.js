var background;


var gameOverState = {
  create: function(){
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    var continueButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    continueButton.onDown.add(this.continue, this);

    // Add Game over message
    var text_style = { font: 'bold 100px Acme', fill: '#E6072C'};
    var text = this.game.add.text(400, 100, "Game Over!", text_style);
    text.anchor.setTo(0.5, 0.5)

    // Display Score
    var score_style = { font: 'bold 60px Acme', fill: '#ffffff'};
    var text1 = this.game.add.text(400, 300, "Score is " + score, score_style);
    text1.anchor.setTo(0.5, 0.5)

    // Display Instructions
    var instruction_style = { font: 'bold 80px Acme', fill: '#51A6C2'};
    var text2 = this.game.add.text(400, 500, "Press space to continue", instruction_style);
    text2.anchor.setTo(0.5, 0.5)

  },

  update: function(){
    background.tilePosition.y += 2;
  },

  continue: function(){
    game.state.start('menu');
  }

};
