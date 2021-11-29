'use strict';

const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
    NODE_ENV,
    NODE_PATH: NODE_PATH_CLI = './',
} = process.env;

const IS_DEVELOPMENT = NODE_ENV !== 'production';
const OUTPUT_PATH = IS_DEVELOPMENT
    ? '.build'
    : 'docs';
const NODE_PATH = path.resolve(NODE_PATH_CLI);
const SRC_ROOT = path.join(NODE_PATH, 'src');
const OUTPUT_STATIC_PATH = path.join(NODE_PATH, OUTPUT_PATH);

function buildName(type, ext) {
    return IS_DEVELOPMENT
        ? `[name].${type}.${ext}`
        : `[contenthash]/${type}.${ext}`;
}

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
        filename: buildName('bundle', 'js'),
        path: OUTPUT_STATIC_PATH,
        publicPath: './',
        globalObject: 'this',
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
        new AssetsPlugin({
            filename: 'assets.json',
            prettyPrint: true,
            path: OUTPUT_STATIC_PATH,
            fullPath: true,
            update: true,
        }),
        new MiniCssExtractPlugin({
            filename: buildName('bundle', 'css'),
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
                    to: OUTPUT_STATIC_PATH,
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
                ],
            },
        ],
    },
};
