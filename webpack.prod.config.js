const path = require('path');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: ['./resources/typescript/main.ts', './resources/scss/main.scss'],
    optimization: {
        splitChunks: {
            cacheGroups: {
                style: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    stats: 'minimal',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new webpack.DefinePlugin({
            DEV: false
        }),
        new CheckerPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            {from: './resources/assets', to: 'assets'}
        ]),
        new WebpackBar({
            name: 'Production build',
        }),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
            compilationSuccessInfo: {
                messages: ['App is ready to be deployed on production'],
            },
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: false,
                extractComments: true,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                },
                mangle: {
                    reserved: ['$super', '$', 'exports', 'require'],
                },
                output: {
                    comments: false,
                },
            },
        }),

    ],
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss'],
        modules: ["node_modules"],
        alias: {
            Components: path.join(__dirname, "resources/typescript/Components"),
            Core: path.join(__dirname, "resources/typescript/Core"),
            Types: path.join(__dirname, "resources/typescript/Types"),
            Tests: path.join(__dirname, "resources/typescript/Tests"),
        },
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public/build/'),
        publicPath: '/public/build/',
        pathinfo: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|\.test\.ts$)/,
                enforce: 'post',
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                },
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        limit: 1024,
                    },
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        limit: 1024,
                    },
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "node_modules/bootstrap/js/src/")
                ],
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'tsconfig.json'),
                            declaration: false,
                            useBabel: true,
                            useCache: true,
                            babelCore: "@babel/core",
                            silent: true
                        },
                    },

                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {loader: "postcss-loader", options: {sourceMap: 'inline'}},
                    {loader: "fast-sass-loader",
                        options: {
                            includePaths: ['./resources/scss/', './node_modules'],
                            // outputStyle: 'expanded'
                        }
                    },
                    'resolve-url-loader'
                ]
            }
        ]
    }
};
