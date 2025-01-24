const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/ts/index.ts',
    output: {
        filename: 'bundle.min.umd.js',  // Output JavaScript bundle
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'LayeredModalSystem',
            type: 'umd',
        },
        globalObject: "typeof self !== 'undefined' ? self : this",
    },
    resolve: {
        extensions: ['.ts','.js','.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
    /*watch: true,*/

    devServer: {
        static: [
            {directory: path.resolve(__dirname, 'demo'), publicPath: '/'},
            {directory: path.resolve(__dirname, 'dist'), publicPath: '/dist'}
        ],
        compress: true,
        host: '127.0.0.1',
        port: 8080,
        open: true,
        hot: true,
        liveReload: true,
        devMiddleware: {
            writeToDisk: (filePath) => {
                return filePath.endsWith('bundle.min.umd.js')
                    || filePath.endsWith('styles.min.css');
            },
        },
    },
};
