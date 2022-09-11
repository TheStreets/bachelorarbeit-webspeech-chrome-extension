const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const tsRules = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: 'ts-loader',
}

const styleRules = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
}

const resourceRules = {
    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
    type: 'asset/resource'
}

const plugins = [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'build'),
            }
        ],
    }),
    ...getHtmlPlugins([
        'index'
    ]),
];

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'index.tsx'),
        // background: path.resolve(__dirname,'../src/background/background.ts'),
        // contentScript: path.resolve(__dirname, '../src/content-script/content-script.ts'),
    },
    module: {
        rules: [
            tsRules,
            styleRules,
            resourceRules
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: plugins,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    // optimization: {
    //     splitChunks: {
    //         chunks(chunk) {
    //             return chunk.name !== 'content-script' && chunk.name !== 'background'
    //         }
    //     },
    // }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HTMLWebpackPlugin({
        title: 'Bachelor Thesis: Virtual Assistance',
        filename: `${chunk}.html`,
        chunks: [chunk],
    }))
}
