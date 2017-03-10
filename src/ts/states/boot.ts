import Stats = require('stats.js')
import * as logger from 'js-logger'
import * as appConfig from '../app.config'

export default class Boot extends Phaser.State {

  create() {

    logger.info('Boot enter');

    if(appConfig.stats){
      this.addStats();
    }

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

  // TODO make stats a decorator of game.update in app.ts
  addStats () {

    let stats = new Stats();

    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.getElementById('container').appendChild(stats.dom);

    /*
     stats.dom.style.position = 'absolute';
     stats.dom.style.right = '0px';
     stats.dom.style.top = '0px';
     */

    // In order to correctly monitor FPS
    // we have to make calls to the stats package
    // before and after Phaser's update.
    let oldUpdate = this.game.update;
    this.game.update = (time: number): void => {
      stats.begin();
      oldUpdate(time);
      stats.end();
    }
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
    if (!this.game.device.desktop && this.scale.compatibility.supportsFullScreen) {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
      this.game.scale.fullScreenTarget  = document.getElementById('container');

      //TODO handle full screen

    }
  }
};
