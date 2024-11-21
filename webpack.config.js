const modoDev = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: './build', // `static` replaces `contentBase` in Webpack 5
        port: 9000,
    },
    optimization: {
        minimize: !modoDev, // Minimize only in production mode
        minimizer: [
            new TerserPlugin({
                parallel: true, // Run in parallel for faster builds
                terserOptions: {
                    sourceMap: modoDev, // Enable source maps in development
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
    },
    resolve: {
        fallback: {
            // Polyfills para os módulos que não são mais incluídos por padrão no Webpack 5
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            vm: require.resolve('vm-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src/', from: '**/*.html' },
                { context: 'src/', from: 'imgs/**/*' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // Interprets `@import` and `url()` in CSS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource', // Webpack 5 built-in replacement for `file-loader`
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                type: 'asset/resource', // Webpack 5 built-in replacement for `file-loader`
            },
        ],
    },
};
