import webpack from 'webpack';
import base from './webpack.base.config.babel.js';

const config = base.getConfig({
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: './',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});

export default config;
