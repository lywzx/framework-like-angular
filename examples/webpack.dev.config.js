// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'development',

    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir);
        let entry = path.join(fullDir, 'app.tsx');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry];
        }

        entry = path.join(fullDir, 'app.ts');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry];
        }

        return entries;
    }, {}),
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/',
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.vue$/, use: ['vue-loader'] },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'less-loader'],
            },
            { test: /\.tsx?$/, exclude: /node_modules/, use: ['ts-loader'] },
        ],
    },

    resolve: {
        alias: fs.readdirSync(path.join(__dirname, '../packages')).reduce((entries, dir) => {
            const fullDir = path.join(__dirname, '../packages', dir, 'src');

            entries[`@framework-like-angular/${dir}`] = fullDir;

            return entries;
        }, {}),
        extensions: ['.js', '.ts', '.d.ts', '.tsx', '.vue', '.css'],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'shared',
                    filename: 'shared.js',
                    chunks: 'initial',
                },
            },
        },
    },

    plugins: [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};
