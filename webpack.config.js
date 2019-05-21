const REVISION = require('node-object-hash')({sort: false}).hash(process.env.npm_package_name + process.env.npm_package_version).substr(0, 10);

const Path = require('path');
const readline = require("readline");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
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
    filename: '[name].js?' + REVISION,
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
        use: ['file-loader?name=img/[name].[ext]?' + REVISION]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader?name=fonts/[name].[ext]?' + REVISION]
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
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
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
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './src/assets/index.html' }),
    new CopyWebpackPlugin([
      { from: './src/assets/favicon.ico', to: '' },
      { from: './src/assets/apple-touch-icon.png', to: '' }
    ]),
    new MiniCssExtractPlugin({ filename: '[name].css?' + REVISION }),
    new CleanWebpackPlugin(),
    new HardSourceWebpackPlugin({ cacheDirectory: Path.join(__dirname, '.cache') }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      if (percentage == 0) {
        console.info('');
      }
      if (percentage > 0) {
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout);
      }
      if (percentage < 1) {
        let msg = (message + ' ' + args.join(' '));
        if (msg.length > process.stdout.columns - 7) {
          msg = msg.substr(0, process.stdout.columns - 10) + '...';
        }
        console.info(
          '\u001b[33m' + (percentage * 100).toFixed(1) + '%' + '\u001b[0m',
          '\u001b[32m' + msg + '\u001b[0m');
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.npm_package_name),
      VERSION: JSON.stringify(process.env.npm_package_version),
      REVISION: JSON.stringify(REVISION)
    })
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

module.exports = (env, options) => {
  if (env && env.target == 'app') {
    return [AppConfig];
  }
  else if (env && env.target == 'server') {
    return [ServerConfig];
  }
  else {
    return [AppConfig, ServerConfig];
  }
}
