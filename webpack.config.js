const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const config = {
    entry: './src/index.js', // File đầu vào
    output: { // File đầu ra
        publicPath: path.build,
        path: path.resolve(__dirname, 'build'), // Nơi chưa file đầu ra
        filename: 'bundle.js', // Tên file đầu ra
    },
    devServer: {
        historyApiFallback: true
      }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Định dạng file js, jsx
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env', '@babel/preset-react'] },
            },
            {
                test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
                use: ["style-loader", "css-loader"],
                
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset/resource'
        
             }
           
        ]
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            favicon: "./public/favicon.ico",
            manifest: "./public/manifest.json"
        }),
        new InterpolateHtmlPlugin({ PUBLIC_URL: 'public' })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
}

module.exports = config;