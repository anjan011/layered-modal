const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/ts/index.ts',
    output: {
        filename: 'minified.bundle.js',  // Output JavaScript bundle
        path: path.resolve(__dirname, 'dist'),
        //library: 'LayeredModalManager',
        library: {
            name: 'LayeredModal',
            type: 'umd',
            export: 'default', // Ensures the default export is exposed globally
        },
        libraryTarget: 'umd',
        globalObject: "this",
    },
    resolve: {
        extensions: ['.ts','.js'],
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
                    MiniCssExtractPlugin.loader, // Extracts CSS into a separate file
                    "css-loader", // Translates CSS into CommonJS
                    "sass-loader" // Compiles Sass to CSS
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.min.css", // Minified CSS output
        }),
    ],
    mode: 'development', // Change to 'development' for debugging
    /*watch: true,*/ // Enable watch mode to auto-rebuild on SCSS & TS file changes

    devServer: {
        static: path.resolve(__dirname, 'dist'), // Serve 'demo' as the document root
        compress: true, // Enable gzip compression
        host: '127.0.0.1',
        port: 8080, // Change to any port if needed
        open: true, // Auto-open browser on start
        hot: true, // Enable Hot Module Replacement (HMR)
        liveReload: true,
    },
};
