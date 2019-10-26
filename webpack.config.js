const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'main.js',
        publicPath: path.resolve(__dirname, '/dist/'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        publicPath: path.resolve(__dirname, '/dist/'),
        stats: {
            children: false,
            maxModules: 0
        },
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}