import * as logger from 'js-logger'
import * as appConfig from '../app.config'

/**
 * Boot Phaser game state.
 *
 * This is where we handle all Phaser specific stuff before we start loading assets
 * and start dealing with game specific logic.
 */
export default class Boot extends Phaser.State {

  create() {
    logger.info('Boot enter');

    this.game.sound.mute = appConfig.mute;

    // set scale mode
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // align
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;

    this.handleOrientation();

    this.handleFullScreen();

    logger.info('Boot leave');
    this.game.state.start('preloader');
  }

  handleOrientation () {
    if (!this.game.device.desktop
     && (appConfig.orientation.forceLandscape || appConfig.orientation.forcePortrait)) {

      this.scale.forceOrientation(
          appConfig.orientation.forceLandscape, 
          appConfig.orientation.forcePortrait
      );
      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
  }

  enterIncorrectOrientation () {
    // TODO handle incorrect orientation
  }

  leaveIncorrectOrientation () {
    // TODO handle correct orientation
  }

  handleFullScreen () {
    if (!this.game.device.desktop
      && this.scale.compatibility.supportsFullScreen) {

      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
      this.game.scale.fullScreenTarget  = document.getElementById('container');

      //TODO handle full screen
    }
  }
};
