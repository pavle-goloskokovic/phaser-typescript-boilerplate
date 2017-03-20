/**
 * App/game entry point
 */

import '../style' // loading stylus css

import 'pixi.js'
import 'phaser' // loading Phaser with dependencies

import * as _ from 'lodash'
import * as logger from 'js-logger'

import * as appConfig from './app.config'

import PhaserStatsGame from "./game/PhaserStatsGame";

import Boot from './states/boot'
import Preloader from './states/preloader'
import Game from "./states/game";

/**
 * Setup logger
 */
logger.useDefaults();
logger.setLevel(appConfig.logLevel);

/**
 * Phaser game config
 * @type {Phaser.IGameConfig}
 */
let config: Phaser.IGameConfig = {
    width:    appConfig.size.x,
    height:   appConfig.size.y,
    renderer: Phaser.AUTO,
    parent:   'container',     // parent id - '' means  no container
    forceSetTimeOut: false     // should be optional but it isn't
};                             // https://github.com/photonstorm/phaser/issues/2689

/**
 * Phaser game instance
 * Choosing implementation based on 'stats' app config setting
 * @type {Phaser.Game}
 */
let game: Phaser.Game;
if(appConfig.stats && process.env.NODE_ENV !== 'production'){
    game = new PhaserStatsGame(config);
} else {
    game = new Phaser.Game(config);
}

/**
 * Registering game states
 */
_.each({
    boot: Boot,
    preloader: Preloader,
    game: Game
}, function(state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
