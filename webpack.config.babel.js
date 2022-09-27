const webpack = require("webpack");
const path = require("path");

let config = {
    mode: "production",
    context: path.resolve(__dirname, "src"),
    entry: "./main.js",
    output: {
        path: path.join(__dirname, "/docs"),
        filename: "bundle_0210fcc3-e919-4a67-8ad9-afa42295f765.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src/0210fcc3-e919-4a67-8ad9-afa42295f765.html")],
        extensions: [".js"],
    },
    devServer: {
        static: path.resolve(__dirname, "docs"),
        hot: true,
        open: true,
        port: 8888,
        // 2020年11月21日 土曜日 18:19:13.922 GMT+09:00 に1秒ズレた値
        headers: { "X-Timer": "S1605950354.922070,VS0,VE0" },
    },
    //devtool: 'inline-source-map',
    optimization: {
        minimize: true,
    },
};

module.exports = config;
