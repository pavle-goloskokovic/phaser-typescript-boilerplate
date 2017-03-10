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
            test: /pixi\.js/,
            loader: 'expose-loader?PIXI'
        }, {
            test: /phaser-split\.js$/,
            loader: 'expose-loader?Phaser'
        }, {
            test: /p2\.js/,
            loader: 'expose-loader?p2'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'phaser': path.join(phaserModule, 'build', 'custom', 'phaser-split.js'),
            'pixi.js': path.join(phaserModule, 'build', 'custom', 'pixi.js'),
            'p2': path.join(phaserModule, 'build', 'custom', 'p2.js')
        }
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin()
    ]
};