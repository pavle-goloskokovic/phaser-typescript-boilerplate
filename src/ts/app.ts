import '../style'

import 'pixi.js'
import 'phaser'

import * as _ from 'lodash'
import * as logger from 'js-logger'

import * as appConfig from './app.config'
import Boot from './states/boot'
import Preloader from './states/preloader'
import Game from "./states/game";
import StatsPhaserGame from "./game/StatsPhaserGame";

// Setup logger
logger.useDefaults();
logger.setLevel(appConfig.logLevel);

// Define states
let states = {
    boot: Boot,
    preloader: Preloader,
    game: Game
};

// Define game config
let config: Phaser.IGameConfig = {
    width:    appConfig.size.x,
    height:   appConfig.size.y,
    renderer: Phaser.AUTO,
    parent:   'container',     // parent id - '' means  no container
    forceSetTimeOut: false     // should be optional but it isn't
};                             // https://github.com/photonstorm/phaser/issues/2689

// Init game
let game: Phaser.Game;
if(appConfig.stats){
    game = new StatsPhaserGame(config);
} else {
    game = new Phaser.Game(config);
}

// Automatically register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
