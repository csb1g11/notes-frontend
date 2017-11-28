let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    config: JSON.stringify(require('./config.json'))
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ["transform-class-properties", "transform-es2015-modules-commonjs"]
      }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
        ]
    }]
  }
};