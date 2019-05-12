const Path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: '[name].js?[hash]',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.ts$/,
        use: ['ts-loader', 'tslint-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-comment/hookRequire',
              plugins: [
                require('postcss-import')({
                  plugins: [
                    require('stylelint')({
                      plugins: ['stylelint-scss', 'stylelint-order']
                    })
                  ]
                }),
                require('postcss-nested'),
                require('postcss-simple-vars'),
                require('autoprefixer')({ browsers: ['last 2 versions'] })
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          compress: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css(\?.+)?$/,
        cssProcessorOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              autoprefixer: false
            }
          ]
        }
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial"
        }
      }
    }
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.min.js'
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].css?[hash]' }),
    new CleanWebpackPlugin()
  ]
}
