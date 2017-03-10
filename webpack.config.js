var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src", "ts", "app.ts"),
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

    ]
};