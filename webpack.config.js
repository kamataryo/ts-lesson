const path              = require('path')
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/main.tsx',
    // the entry point of our app
  ],

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader' }]
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
    ]

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    compress: true,
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
}
