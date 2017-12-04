var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
    vendor: [
      'react', 'react-dom', 'prop-types',
    ],
    main: path.resolve(APP_DIR, 'index.jsx'),
    styles: path.resolve(APP_DIR, 'sass/css.js'),
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_DIR, 'index.html')
    }),
    new ExtractTextPlugin({
      filename: 'styles.[hash].css'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
    }),
    new CleanWebpackPlugin([
      BUILD_DIR,
    ], {
      exclude: ['.gitkeep'],
      verbose: true,
      dry: false,
      watch: false,
      allowExternal: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-2', 'react'],
          plugins: [
            'transform-object-rest-spread', 'transform-class-properties',
          ],
        },
      },
      {
        test: /\.html$/,
        include: APP_DIR,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: [require('autoprefixer')({ browsers: ['last 2 versions'] })] },
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }
    ]
  },
};

module.exports = config;
