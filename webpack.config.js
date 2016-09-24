const path = require('path');
const root = __dirname;
const depsPath = path.join(root, 'deps');
const nodeModulesPath = path.join(root, 'node_modules');
const privStaticPath = path.resolve(root, 'priv', 'static');
const buildPath = path.join(privStaticPath, 'bundles');
const commonPath = path.resolve('web', 'static', 'modules', 'common');
const commonEntryFile = path.join(commonPath, 'common.ts');
const mainPath = path.resolve('web', 'static', 'modules', 'main');
const mainEntryFile = path.join(mainPath, 'main.ts');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  entry: {
    common: commonEntryFile,
    main: mainEntryFile
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [nodeModulesPath],
    alias: {}
  },
  noParse: [],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new ExtractTextPlugin("app.css")
  ],
};