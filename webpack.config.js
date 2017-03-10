const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, 'node_modules', 'phaser');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'ts', 'app.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            include: [
                path.resolve(__dirname, 'src', 'ts')
            ],
            loader: 'ts-loader'
        }, {
            test: /pixi\.js$/,
            loader: 'expose-loader?PIXI'
        }, {
            test: /phaser-arcade-physics\.js$/,
            loader: 'expose-loader?Phaser'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'pixi.js': path.join(phaserModule, 'build', 'custom', 'pixi.js'),
            'phaser': path.join(phaserModule, 'build', 'custom', 'phaser-arcade-physics.js')
        }
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
};