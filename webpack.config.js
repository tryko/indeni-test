const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false
                      },
                      webp: {
                        quality: 75
                      }
                    }
                  }
                ]
              }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'Indeni-test',
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
