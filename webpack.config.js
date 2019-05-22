const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourcePlugin = require('hard-source-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
  return {
    mode: 'production',
    entry: {
      main: './src/main.ts'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
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
          use: [
            { loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },
            'tslint-loader'
          ]
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
                  require('postcss-assets')({ relative: true }),
                  require('autoprefixer')({ browsers: ['last 2 versions'] })
                ]
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: ['html-loader?minimize=true']
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          use: ['json-loader']
        },
        {
          test: /\.(gif|png|jpg)$/,
          use: ['file-loader?name=img/[name].[ext]']
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: ['file-loader?name=fonts/[name].[ext]']
        },
        {
          test: /\.styl$/,
          use: ['style-loader', 'css-loader', 'stylus-loader']
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
            name: 'vendor',
            chunks: 'initial'
          }
        }
      }
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        vuex$: 'vuex/dist/vuex.esm.js'
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
      new CopyWebpackPlugin([
        { from: './src/assets/favicon.ico', to: '' },
        { from: './src/assets/apple-touch-icon.png', to: '' }
      ]),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new HardSourcePlugin(),
      new VueLoaderPlugin(),
      new VuetifyLoaderPlugin()
    ],
    performance: {
      maxEntrypointSize: 1024 * 1024,
      maxAssetSize: 1024 * 1024
    }
  }
}
