import path from 'path';
import { Configuration, BannerPlugin } from 'webpack';
import { generateHeader } from './plugins/userscript.plugin';

const config: Configuration = {
    mode: 'none',
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        path: path.join(__dirname, 'userscript'),
        filename: 'gscholar-title-translator.js',
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
        'axios-userscript-adapter': 'axiosGmxhrAdapter'
    },
    plugins: [
        new BannerPlugin({
            banner: generateHeader,
            raw: true,
        })
    ]
}

export default config;