import { resolve } from 'path';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

import * as appConfig  from './src/ts/app.config';
import devConfig from './webpack.config';
import { banner } from "./webpack.config";

export default {
    entry: devConfig.entry,
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[chunkhash].[name].js'
    },
    module: devConfig.module,
    resolve: devConfig.resolve,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            title: appConfig.title,
            template: './src/templates/index.pug',
            data: {
                description: appConfig.description,
                analyticsId: appConfig.analyticsId
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: {
                    compress: false,
                    mangle: false
                }
            }
        }),
        new ExtractTextPlugin('[contenthash].style.css'),
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }]),
        new ImageminPlugin({ // Make sure that the plugin is after any plugins that add images
            test: /\.png$/i,
            optipng: {
                optimizationLevel: 7,
            },
            pngquant: {
                quality: '65-90',
                speed: 4,
            }
        })
    ]
};