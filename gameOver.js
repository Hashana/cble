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

    // Display Score an highest badge achieved.
    var badge = this.getBadge();
    var score_style = { font: 'bold 30px Acme', fill: '#ffffff'};
    var text1 = this.game.add.text(400, 300, "Score is: " + score + "\n\nHighest Badge Achieved: " + badge, score_style);
    text1.anchor.setTo(0.5, 0.5)

    // Display Instructions
    var instruction_style = { font: 'bold 40px Acme', fill: '#51A6C2'};
    var text2 = this.game.add.text(400, 500, "Press space to continue", instruction_style);
    text2.anchor.setTo(0.5, 0.5)

  },

  update: function(){
    background.tilePosition.y += 2;
  },

  continue: function(){
    game.state.start('menu');
  },

  getBadge(){
    if(primeCosmonaut == true){
      return 'Prime Cosmonaut!  \nOutstanding work! You have shown excellent  \nknowledge of Prime and Composite numbers.';
    }
    else if(primeCommander == true){
      return 'Prime Commander! \nFantastic work! Keep going there is still \n                   one rank to achieve.';
    }
    else if(primeCommandPilot == true){
      return 'Prime Command Pilot! \nVery well done! You are really starting to grasp the \ndifference between Prime and Composite numbers. \nKeep going!';
    }
    else if(primePilot == true){
      return 'Prime Pilot! \nGreat work!';
    }
    else if(primeSpaceCadet == true){
      return 'Prime Space Cadet! \nGreat start! \nKeep practising and you will rank up again in no time!';
    }
    else{
      return 'None... Have another go. \nYou can achieve a rank next time around!';
    }
  }

};
