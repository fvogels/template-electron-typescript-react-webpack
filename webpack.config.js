const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPkgJson = require('copy-pkg-json-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function determineMode() {
    return process.env.NODE_ENV;
}

const output_path = path.join(__dirname, 'build');

const shared = {
    mode: determineMode(),
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
    resolve: {
        extensions: [ '.js', '.json', '.ts', '.tsx' ],
        plugins: [ new TsconfigPathsPlugin() ]
    }
}

module.exports = [
    {
        ...shared,
        entry: './src/main.ts',
        target: 'electron-main',
        output: {
            path: output_path,
            filename: 'main.bundle.js'
        },
        plugins: [
            new CopyPkgJson({
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
            path: output_path,
            filename: 'react.bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html')
            })
        ]
    }
];
