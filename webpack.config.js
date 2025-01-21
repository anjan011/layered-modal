const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry : './src/ts/index.ts',
    output: {
        filename: 'minified.bundle.js',  // Output JavaScript bundle
        path: path.resolve(__dirname, 'dist'),
        library: 'LayeredModalManager',
        libraryTarget: 'umd',
        globalObject: "this",
    },
    resolve: {
        extensions: ['.ts'],
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
    mode: 'production', // Change to 'development' for debugging
    watch: true, // Enable watch mode to auto-rebuild on SCSS & TS file changes
};
