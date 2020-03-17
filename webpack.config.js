const { resolve } = require('path')
const ESMOutputPlugin = require('@purtuga/esm-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const { entry, publicPath } = require('./manifest.js')

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    library: 'LIB',
    libraryTarget: 'var',
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.less', '.sass', '.scss', '.vue'],
    modules: [
      resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|ttf|woff2?)$/,
        use: 'file-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [
    new ESMOutputPlugin(),
    new VueLoaderPlugin(),
  ],
}
