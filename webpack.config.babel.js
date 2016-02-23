import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    sender: './src/sender.js',
    receiver: './src/receiver.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'cheap-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Codename Cast',
      chunks: ['sender'],
      filename: 'sender.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Codename Cast Receiver',
      chunks: ['receiver'],
      filename: 'receiver.html',
    }),
  ],
};
