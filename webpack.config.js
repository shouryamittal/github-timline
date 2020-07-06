const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

module.exports = [
    {
        mode : "development",
        entry: "./src/client/index.js",
        output : {
            path: path.resolve(__dirname, "public"),
            filename: '[contenthash].bundle.js',
            publicPath : '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js)/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(jpg|svg|png|jpeg)$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins: [new webpack.BannerPlugin({
            banner: "__isBrowser__ = true;",
            raw: true,
            include: /\.js$/
        }),new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'head',
            scriptLoading: 'defer'
        })]
    },
    {
        mode: 'development',
        entry: './src/server/index.js',
        output: {
            path: __dirname,
            filename: 'server.js',
            publicPath: '/'
        },
        target: 'node',
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: 'ignore-loader'
                },
            ]

        },
        plugins: [new webpack.BannerPlugin({
            banner: "__isBrowser__ = false;",
            raw: true,
            include: /\.js$/
        })]
    }
]
