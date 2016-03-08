var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');


// Set up game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('gameInstructions', gameInstructionsState);
game.state.add('play', playState);
game.state.add('learn', learnState);
game.state.add('learn2', learn2State);
game.state.add('gameOver', gameOverState);
game.state.add('win', winState);

game.state.start('boot');
