const {resolve} = require('path')
const {CleanWebpackPlugin: Cleanup} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const {base, entry} = require('./manifest.json')

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[contenthash].js',
    publicPath: base,
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
    new Cleanup(),
    new VueLoaderPlugin(),
  ],
  devServer: {
    contentBase: 'dist',
    port: 8080,
    writeToDisk: true,
  },
}
