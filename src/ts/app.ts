import 'pixi.js'
import 'phaser'
import * as _ from 'lodash'
import * as logger from 'js-logger'

import * as appConfig from './app.config'
import Boot from './states/boot'
import Preloader from './states/preloader'
import Game from "./states/game";

// Setup logger
logger.useDefaults();
logger.setLevel(appConfig.logLevel);

// Define states
let states = {
    boot: Boot,
    preloader: Preloader,
    game: Game
};

// Init game
let game = new Phaser.Game(
    appConfig.size.x,   // width
    appConfig.size.y,   // height
    Phaser.AUTO,        // renderer
    'container'/*,      // parent id - '' means no container
    null,               // state
    true,               // transparent
    false             */// antialias 
);

// Automatically register each state.
_.each(states, function(state, key) {
    game.state.add(key, state);
});

game.state.start('boot');
