//const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import MiniCssExtractPlugin from "mini-css-extract-plugin";

import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/ts/index.ts',
    output: {
        filename: 'bundle.min.esm.js',
        path: path.resolve(__dirname, 'dist'),
        module: true,  // Enables ES module output
        library : {
            type : 'module',
            /*export: 'default'*/
        }
    },
    experiments: {
        outputModule: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.min.css",
        }),
    ],
    mode: 'development',

    devServer: {
        static: [
            {directory: path.resolve(__dirname, 'demo'), publicPath: '/'},
            {directory: path.resolve(__dirname, 'dist'), publicPath: '/dist'}
        ],
        compress: true,
        host: '127.0.0.1',
        port: 8088,
        open: true,
        hot: false,
        liveReload: true,
        /*client: {
            reconnect: true // ✅ Prevents infinite WebSocket reconnect loops
        },*/
        /*watchFiles: {
            paths: ['src/!**!/!*', 'demo/!**!/!*'],
            options: {
                ignored: ['dist/!**!/!*'], // ✅ Prevents watching already built files
            }
        },*/
        /*headers: {
            "Content-Type": "application/javascript"
        },*/
        devMiddleware: {
            writeToDisk: (filePath) => {
                return filePath.endsWith('bundle.min.esm.js') ||
                    filePath.endsWith('styles.min.css');
            },
        },

    },
    optimization: {
        usedExports: true, // Enable tree shaking by marking unused exports as unused
    }
};
