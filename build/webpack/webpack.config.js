'use strict';

var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'vendor': './.release/vendor.js',
        'docker/docker-task': './.release/docker/docker-task.js'
    },

    target: 'node',

    output: {
        path: helpers.root('.release'),
        filename: '[name].js'
    },

    plugins: [
        // Remove any common dependencies between the different chunks and leave them in vendor
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new webpack.NoEmitOnErrorsPlugin(),
    ],
};