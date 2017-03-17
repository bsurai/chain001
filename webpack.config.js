/*jshint esversion: 6 */
/* jshint node: true */

"use strict";
let path = require('path');
let debug = true; //process.env.NODE_ENV !== "production";
let webpack = require('webpack');
var fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: {
        server: "./server.ts"
    },
    node: {
        __filename: false,
        __dirname: false
    },
    target: 'node',
    output: {
        path: path.join(__dirname, ""),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    externals: nodeModules,

    /*plugins: [
        new webpack.DefinePlugin({
            $dirname: '__dirname'
        })
    ],*/

    devtool: "source-map",

    resolve: {
        extensions: ['Webpack.Webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.handlebars$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'handlebars-loader'
            }

        ]
        /*,
                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]*/
    }
};