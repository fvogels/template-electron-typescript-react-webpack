const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function determineMode() {
    return process.env.NODE_ENV;
}

const shared = {
    mode: determineMode(),
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'main.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        })
    ]
}

module.exports = [
    {
        ...shared,
        entry: './src/main.ts',
        target: 'electron-main',
        output: {
            path: __dirname + '/dist',
            filename: 'main.bundle.js'
        },
    },
    {
        ...shared,
        entry: './src/renderer.tsx',
        target: 'electron-renderer',
        output: {
            path: __dirname + '/dist',
            filename: 'react.bundle.js'
        },
    }
];
