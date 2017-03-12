const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const phaserModule = path.join(__dirname, 'node_modules', 'phaser');

module.exports = {
    entry: {
        vendor: ['pixi.js', 'phaser', 'lodash', 'js-logger', 'stats.js'],
        app: path.resolve(__dirname, 'src', 'ts', 'app.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // TODO make production webpack config with [chunkhash] in filename
        filename: '[name].js'
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
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            //  filename: "vendor.js",
            // (Give the chunk a different name)
            minChunks: Infinity
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        }),
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }])
    ]
};