import MiniCssExtractPlugin from "mini-css-extract-plugin";

import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env,argv) => {

    const isProduction = argv.mode === "production";

    return {
        entry: './src/ts/index.ts',
        output: {
            filename: isProduction ? 'bundle.min.esm.js' : 'bundle.dev.min.esm.js',
            path: path.resolve(__dirname, 'dist'),
            module: true,
            library: {
                type: 'module',
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
            devMiddleware: {
                writeToDisk: (filePath) => {
                    return filePath.endsWith('bundle.min.esm.js') ||
                        filePath.endsWith('bundle.dev.min.esm.js') ||
                        filePath.endsWith('styles.min.css');
                },
            },

        },
        optimization: {
            usedExports: true,
        }
    }

};
