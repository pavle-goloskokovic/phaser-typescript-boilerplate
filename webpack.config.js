var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/ts/app.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            include: [
                path.resolve(__dirname, "src", "ts")
            ],
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: 'source-map',
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ]
};