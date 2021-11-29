'use strict';

const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
    NODE_ENV,
    NODE_PATH: NODE_PATH_CLI = './',
} = process.env;

const IS_DEVELOPMENT = NODE_ENV !== 'production';
const NODE_PATH = path.resolve(NODE_PATH_CLI);
const SRC_ROOT = path.join(NODE_PATH, 'src');
const OUTPUT_STATIC_PATH = path.join(NODE_PATH, 'docs');

module.exports = {
    performance: {
        maxEntrypointSize: Math.pow(10, 6),
        maxAssetSize: Math.pow(10, 6),
    },
    stats: {
        children: false,
    },
    context: SRC_ROOT,
    mode: NODE_ENV,
    entry: {
        app: './index.tsx',
    },
    output: {
        path: OUTPUT_STATIC_PATH,
        filename: '[contenthash].bundle.js',
        publicPath: '',
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: false,
        ignored: [
            '.awcache',
            '.build',
            'node_modules',
        ],
    },
    resolve: {
        modules: [
            NODE_PATH,
            './node_modules',
        ],
        extensions: [
            '.ts',
            '.js',
            '.tsx',
            '.scss',
            '.css',
        ],
        fallback: {
            buffer: false,
        },
    },
    devtool: 'source-map',
    plugins: [
        !IS_DEVELOPMENT && new CompressionPlugin({
            filename: '[path][base].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        !IS_DEVELOPMENT && new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            prettyPrint: true,
            path: OUTPUT_STATIC_PATH,
            fullPath: true,
            update: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].bundle.css',
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    to: path.join(OUTPUT_STATIC_PATH, 'static'),
                },
            ],
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            configFileName: 'tsconfig.json',
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: !IS_DEVELOPMENT,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            hash: 'sha512',
                            digest: 'hex',
                            name: 'i/[contenthash].[ext]',
                            limit: 1,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            pngquant: {
                                speed: IS_DEVELOPMENT ? 10 : 3,
                                optimizationLevel: IS_DEVELOPMENT ? 0 : 7,
                                verbose: false,
                            },
                            // https://github.com/svg/svgo#what-it-can-do
                            svgo: {
                                cleanupAttrs: true,
                                removeDoctype: true,
                                removeViewBox: true,
                                removeComments: true,
                                removeMetadata: true,
                                removeDesc: true,
                                removeEmptyAttrs: true,
                                removeEmptyText: true,
                                cleanupIDs: true,
                                removeUnusedNS: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
};
