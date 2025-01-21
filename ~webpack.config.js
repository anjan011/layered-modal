const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'layered-modal-manager.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'LayeredModalManager',
        libraryTarget: 'umd',
        globalObject: "this",
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production', // Change to 'development' for debugging
};
