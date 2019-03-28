const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/frontend/index.js',
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: '/assets/images'
                    },
                }]
            },
            {
                test: /\.(ttf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: '/assets/fonts'
                    },
                }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new CopyPlugin([
            { from: 'src/frontend/index.html', to: 'index.html' }
        ])
    ],
    // frontend dev server
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        port: 3000,
        open: true
    },
};