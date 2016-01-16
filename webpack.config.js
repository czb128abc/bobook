var webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    /**
     * 指定打包的入口文件，每有一个键值对，就是一个入口文件
     * @type {Object}
     */
	entry: {
        //index_bundle:['./src/index.js'],
        //test_bundle : ['./src/test.js','./src/test2.js']
    },
    /*resolve:{
        fallback: '/usr/local/lib/node_modules'
    },*/
    output: {
        //filename: './dist/[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            /*{
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['react-hot','babel?presets[]=react,presets[]=es2015'] // 'babel-loader' is also a legal name to reference
            },
            {
                test: /\.sass$/,
                loaders: ['style','css','sass?indentedSyntax']
            },
            {
                test: /\.css$/,
                loaders: ['style','css']
            }*/
        ]
    },
    plugins: [
        //new HtmlWebpackPlugin({inject:'body',template: './src/helper/html-webpack-plugin-template.html'})
    ]
}
