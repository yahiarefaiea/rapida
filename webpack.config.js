import config from './bin/config'
import path from 'path'

module.exports = {
  mode: config.env,
  devtool: 'inline-source-map',
  entry: './ui/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.m?styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
}
