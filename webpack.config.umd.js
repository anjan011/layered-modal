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
            filename: isProduction ? 'bundle.min.umd.js' : 'bundle.dev.min.umd.js', // Updated filename for UMD
            path: path.resolve(__dirname, 'dist'),
            library: {
                //name: 'LayeredModalSystem', // Replace 'MyLibrary' with your library name
                type: 'umd', // Set the library type to UMD
                umdNamedDefine: true, // Use named define for AMD modules
            },
            globalObject: 'this', // Ensure compatibility with Node.js and browser
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
                    return filePath.endsWith('bundle.min.umd.js') ||
                        filePath.endsWith('bundle.dev.min.umd.js') ||
                        filePath.endsWith('styles.min.css');
                },
            },
        },
        optimization: {
            usedExports: true,
        }
    }

};