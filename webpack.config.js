const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const copypkg = require('copy-pkg-json-webpack-plugin');

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
        plugins: [
            new copypkg({
                remove: ['scripts', 'devDependencies', 'build'],
                replace: {
                    main: './main.bundle.js',
                    scripts: { start: 'electron ./main.bundle.js' },
                    postinstall: 'electron-builder install-app-deps',
                },
            })
        ]
    },
    {
        ...shared,
        entry: './src/renderer.tsx',
        target: 'electron-renderer',
        output: {
            path: __dirname + '/dist',
            filename: 'react.bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html')
            })
        ]
    }
];
