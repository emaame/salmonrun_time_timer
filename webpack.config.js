const webpack = require("webpack");

module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: './src/main.js',

    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/docs`,
      // 出力ファイル名
      filename: 'bundle.js'
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],

    // Configuration for dev server
    devServer: {
        contentBase: 'docs'
    },


    module: {
      rules: [
        {
          // 拡張子 .js の場合
          test: /\.js$/,
          use: [
            {
              // Babel を利用する
              loader: 'babel-loader',
              // Babel のオプションを指定する
              options: {
                "presets": [
                    ["env", {
                      "targets": {
                        "browsers": ["last 2 versions", "safari >= 7"]
                      }
                    }]
                  ]
              }
            }
          ]
        }
      ]
    },
    // ソースマップを有効にする
    //devtool: 'source-map'
  };