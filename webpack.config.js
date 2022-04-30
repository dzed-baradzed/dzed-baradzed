const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const isProd = process.env.NODE_ENV;

const externals = {
    'react': 'React'
};

const webpackConfig = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    mode: isProd? "production": "development",
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,

                // this loads inline styles
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']

                // this loads a separate css file
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                            sourceMap: !isProd
                        },
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' ,
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devtool: 'source-map',
    // externals,
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'My boilereplate',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/templates/index.ejs')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
};

module.exports = webpackConfig;