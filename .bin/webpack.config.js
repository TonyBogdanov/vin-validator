'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );

const { isProduction } = require( 'webpack-mode' );

const options = {

    resolve: {

        modules: [ path.resolve( __dirname, 'node_modules' ) ],
        extensions: [ '.wasm', '.mjs', '.es6', '.js', '.vue', '.json' ],

    },

    entry: [

        '../public/js/scripts.es6',

    ],

    output: {

        path: path.resolve( __dirname, '../public/js' ),
        filename: 'scripts.js',

    },

    module: {

        rules: [

            {

                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                use: {

                    loader: 'babel-loader',
                    options: {

                        presets: [

                            [ "@babel/preset-env", {

                                targets: {

                                    edge: "12",
                                    firefox: "58",
                                    chrome: "63",
                                    safari: "11.1",
                                    opera: "50",
                                    ie: "11",

                                },

                                useBuiltIns: "usage",
                                corejs: 3,

                            } ],

                        ],

                    },

                },

            },

            {

                test: /\.vue$/,
                exclude: /node_modules/,
                use: 'vue-loader',

            },

            {

                test: /\.scss$/,
                exclude: /node_modules/,
                use: [

                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',

                ],

            },

        ],

    },

    plugins: [

        new VueLoaderPlugin(),

    ],

};

if ( isProduction ) {

    options.optimization = {

        minimizer: [ new UglifyJsPlugin( {

            uglifyOptions: {

                compress: true,
                mangle: true,

            },

        } ) ],

    };

}

module.exports = options;
