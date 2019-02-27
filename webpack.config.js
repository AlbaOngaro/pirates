const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'index.js': [
            './src/js/styles.js',
            './src/js/GraphicsCommon.js',
            './src/js/Ship.js',
            './src/js/shot.js',
            './src/js/world.js',
            './src/js/image-loader.js',
            './src/js/camera.js',
            './src/js/main.js',
            './src/js/effects.js'
        ]
    },
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'build/')
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test:/\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', 
                        options: { 
                            url: false 
                        } 
                    },
                    'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new CopyPlugin([
            { from: 'src/index.html', to: 'index.html' },
            { from: 'src/assets', to: 'assets' }
        ])
    ],
    // frontend dev server
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,
        open: true
    },
};