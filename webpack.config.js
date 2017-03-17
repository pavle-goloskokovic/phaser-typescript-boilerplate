const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const phaserModule = path.join(__dirname, 'node_modules', 'phaser');
const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

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
            'pixi.js': path.join(phaserModule, 'build', 'custom', 'pixi.js'),
            'phaser': path.join(phaserModule, 'build', 'custom', 'phaser-arcade-physics.js')
        }
    },
    devtool: 'source-map', // TODO disable source maps for production
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
            title: 'TODO add title or convert to .ts', //appConfig.title,
            template: './src/templates/index.pug',
            data: {
                description: 'hell yeaaaah description', // TODO read from app config
                analytics: true, // TODO enable only in production,
                analyticsId: 'UA-000000-2' // TODO read form app config or remove it from app config
            },
            //minify: false
            minify: { // TODO use for production
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: {
                    compress: false,
                    mangle: false
                }
            }
        }),
        new ExtractTextPlugin('style.css'), // TODO add '[contenthash].' for production
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }])
    ]
};