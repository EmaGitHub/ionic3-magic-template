const { join } = require('path');
const webpackMerge = require('webpack-merge');
const { dev, prod } = require('@ionic/app-scripts/config/webpack.config');

const customConfig = {
    resolve: {
        alias: {
            '@app': join(__dirname, './src/app'),
            '@core': join(__dirname, './src/app/core/'),
            '@shared': join(__dirname, './src/app/shared/'),
            '@assets': join(__dirname, './src/assets/'),
            '@env': join(__dirname, './src/environments/_environment.BUILD'),    // The environment readed will be always the same
            '@theme': join(__dirname, './src/theme/')
        }
    }
};

const configs = {
    dev: webpackMerge(dev, customConfig),
    prod: webpackMerge(prod, customConfig),
}

module.exports = configs;
