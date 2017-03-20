import { join, resolve } from 'path';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');
import * as appConfig  from './src/ts/app.config';

const phaserModule = join(__dirname, 'node_modules', 'phaser');
export const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

export default {
    entry: {
        vendor: ['pixi.js', 'phaser', 'lodash', 'js-logger', 'stats.js'],
        app: resolve(__dirname, 'src', 'ts', 'app.ts')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            include: [
                resolve(__dirname, 'src', 'ts')
            ],
            loader: 'ts-loader'
        }, {
            test: /pixi\.js$/,
            loader: 'expose-loader?PIXI'
        }, {
            test: /phaser-arcade-physics\.js$/,
            loader: 'expose-loader?Phaser'
        }, {
            test: /\.pug?$/,
            loader: 'pug-loader',
            query: { pretty: true }
        }, {
            test: /\.styl$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before stylus-loader if necessary
                use: ['css-loader', 'stylus-loader']
            })
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.styl'],
        alias: {
            'pixi.js': join(phaserModule, 'build', 'custom', 'pixi.js'),
            'phaser': join(phaserModule, 'build', 'custom', 'phaser-arcade-physics.js')
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
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            title: appConfig.title,
            template: './src/templates/index.pug',
            data: {
                description: appConfig.description
            }
        }),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }])
    ]
};