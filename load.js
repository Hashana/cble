var loadState = {
  preload: function(){
    // add spritesheets
    game.load.spritesheet('learnButton', 'images/learnButton.png', 109, 24);
    game.load.spritesheet('playButton', 'images/playButton.png', 109, 24);
    game.load.spritesheet('numbers', 'images/numbers.png', 29, 38);
    game.load.spritesheet('explosion', 'images/explode.png', 128, 128);

    //add images
    game.load.image('starfield', 'images/starfield.png');
    game.load.image('spaceImage', 'images/space.jpg');
    game.load.image('space2', 'images/space2.jpg');
    game.load.image('ship', 'images/player.png');
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('nextButton', 'images/nextButton.png', 109, 24);
    game.load.image('backButton', 'images/backButton.png', 109, 24);
    game.load.image('menuButton', 'images/menuButton.png', 109, 24);

    // add audio files
    game.load.audio('explosion', 'audio/explosion.mp3');
    game.load.audio('pickUp', 'audio/pickup3.ogg');
    game.load.audio('wrong', 'audio/lose1.ogg');
    game.load.audio('music', 'audio/RetroMystic.ogg');
  },

  create: function() {
    game.state.start('menu');
  }
}
