import path from 'path';
import { Configuration, BannerPlugin } from 'webpack';
import TerserPlugin from "terser-webpack-plugin";
import { generateHeader } from './plugins/userscript.plugin';
import PrettierPlugin from './plugins/prettier.plugin';

const config: Configuration = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        path: path.join(__dirname, 'userscript'),
        filename: 'gscholar-title-translator.user.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    externals: {
        axios: 'axios',
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            // minify: TerserPlugin.swcMinify,
            terserOptions: {
                format: {
                    comments: false,
                },
                compress: false,
                mangle: false,
            },
            extractComments: false,
        })],
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader,
            raw: true,
        })
    ]
}

export default config;