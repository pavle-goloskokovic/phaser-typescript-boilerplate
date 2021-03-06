import * as logger from 'js-logger'

/**
 * Game Phaser state.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.State {

  create () {
    logger.info('Game enter');

    let logo = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        'logo'
    );
    logo.anchor.setTo(0.5, 0.5);
  }
}