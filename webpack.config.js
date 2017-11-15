let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
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
        presets: ['react', 'es2015'],
        plugins: ["transform-class-properties"]
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NOTE_BUCKET': JSON.stringify(process.env.NOTE_BUCKET),
      'process.env.NOTE_READ_KEY': JSON.stringify(process.env.NOTE_READ_KEY),
      'process.env.NOTE_WRITE_KEY': JSON.stringify(process.env.NOTE_WRITE_KEY)
    }),
    new LiveReloadPlugin({appendScriptTag: true})
  ]
};