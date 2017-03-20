import * as logger from 'js-logger'

/**
 * Preloader Phaser state.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.State {

  preload () {
    logger.info('Preloader enter');

    // TODO preload assets

    this.game.load.image('logo', 'assets/images/logo.png');
  }

  create () {
    logger.info('Preloader leave');

    this.game.state.start('game');
  }

}