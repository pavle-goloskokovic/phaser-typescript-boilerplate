import Stats = require('stats.js')

/**
 * Phaser game implementation
 * which adds performance stats to the game
 */
export default class PhaserStatsGame extends Phaser.Game {

    private stats: Stats;

    constructor(config: Phaser.IGameConfig) {
        super(config);

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.getElementById('container').appendChild(this.stats.dom);

        this.stats.dom.style.cssText = `
            position: fixed;
            bottom: 0;
            right: 0;
            cursor: pointer;
            opacity: 0.9;
            z-index: 10000;
        `;
    }

    update(time: number): void {
        this.stats.begin();
        super.update(time);
        this.stats.end();
    }
}