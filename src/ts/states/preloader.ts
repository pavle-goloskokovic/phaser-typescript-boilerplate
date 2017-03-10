import * as logger from 'js-logger'

export default class Preloader extends Phaser.State {

  preload () {
    logger.info('Preloader enter');

    // TODO preload assets

    this.game.load.image('logo', 'images/phaser.png');

  }

  create () {
    logger.info('Preloader leave');
    this.game.state.start('game');
  }

}