const Path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const AppConfig = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: Path.join(__dirname, 'dist'),
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
                require('postcss-assets'),
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
    new HtmlWebpackPlugin({ template: './src/assets/index.html', hash: true }),
    new CopyWebpackPlugin([
      { from: './src/assets/favicon.ico', to: '' },
      { from: './src/assets/apple-touch-icon.png', to: '' }
    ]),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CleanWebpackPlugin(),
    new HardSourceWebpackPlugin({ cacheDirectory: Path.join(__dirname, '.cache') })
  ],
  performance: {
    maxEntrypointSize: (1024 * 1024),
    maxAssetSize: (1024 * 1024)
  }
}

const ServerConfig = {
  mode: 'production',
  entry: {
    server: './src/server.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  output: {
    path: Path.resolve(__dirname, 'bin'),
    filename: 'httpd',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'tslint-loader']
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: (1024 * 1024),
    maxAssetSize: (1024 * 1024)
  }
}

module.exports = [AppConfig, ServerConfig];
