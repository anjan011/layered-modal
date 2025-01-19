const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');  // For JS minification
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');  // For CSS minification
const HtmlWebpackPlugin = require('html-webpack-plugin');  // Import HtmlWebpackPlugin


module.exports = {
    entry: './src/js/index.js', // Your entry JS file

    output: {
        filename: 'bundle.js',  // Output JS bundle
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
    },

    module: {
        rules: [
            {
                test: /\.scss$/,  // Match SCSS files
                include: path.resolve(__dirname, 'src/scss'),  // SCSS directory
                use: [
                    MiniCssExtractPlugin.loader,  // Extract CSS
                    'css-loader',  // Resolves CSS imports
                    'sass-loader', // Compile SCSS to CSS
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS bundle
        }),
        new HtmlWebpackPlugin({
            template: 'demo/index.html',  // Your demo HTML file
            filename: 'index.html',      // Output the processed HTML to dist
        }),
    ],

    // Webpack Dev Server Configuration for v4+
    devServer: {
        static: path.join(__dirname, 'demo'), // Serve static files from /demo folder
        open: true,  // Automatically open the browser
        port: 8080,  // Set the port (default is 8080)
        hot: true,  // Enable hot module replacement (optional)
        historyApiFallback: true,  // Enable client-side routing (optional)
    },

    // Minification for production builds
    optimization: {
        minimize: true,  // Enable minification
        minimizer: [
            new TerserPlugin(),  // Minify JS
            new CssMinimizerPlugin(),  // Minify CSS
        ],
    },
};


/*
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js', // Your main JS file
    output: {
        filename: 'bundle.min.js',  // Final bundled file
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',  // Change to 'production' for minification
    devServer: {
        static: path.resolve(__dirname, './'),
        port: 3000,  // Run server on http://localhost:3000
        hot: true,   // Enable hot module replacement
        open: true,  // Open browser automatically
        liveReload : true,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,  // Process all SCSS files
                include: path.resolve(__dirname, 'src/scss'), // Only process files in /src/scss
                use: [
                    MiniCssExtractPlugin.loader,  // Extract CSS into a separate file
                    'css-loader',  // Resolve CSS imports and URLs
                    'sass-loader', // Compile SCSS to CSS
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS bundle
        }),
    ],

};*/
