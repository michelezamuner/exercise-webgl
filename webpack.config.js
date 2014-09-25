var path = require('path');
var webpack = require('webpack');

module.exports = {
    module: {
        preLoaders: [
            {
                exclude: /node_modules|bower_components/,
                loader: 'jshint-loader'
            }
        ]
    },
    jshint: { devel: true },
    output: { filename: 'bundle.js' },
    resolve: {
        root: [ path.join(__dirname, 'bower_components') ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ]
};
