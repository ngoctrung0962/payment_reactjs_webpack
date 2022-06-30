const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: './src/index.js', // File đầu vào
    output: { // File đầu ra
        filename: 'bundle.js', // Tên file đầu ra
        path: path.resolve(__dirname, 'build') // Nơi chưa file đầu ra
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
                use: ["style-loader", "css-loader"]
            }, 
            {
              test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
              exclude: /node_modules/,
              use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),

    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    
}

module.exports = config;