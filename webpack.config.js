const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
					enforce: true
				},
			}
		},
		runtimeChunk: true
	},
    devServer: {
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			},
            {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
			template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
        }),
        new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
    ]
}
