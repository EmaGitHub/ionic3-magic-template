const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.ENV || 'dev';

if (env === 'prod' || env === 'dev') {

    useDefaultConfig[env].resolve.alias = {
        '@app': path.resolve('./src/app'),
        '@core': path.resolve('./src/app/core'),
        '@shared': path.resolve('./src/app/shared'),
        '@assets': path.resolve('./src/assets'),
        '@env': path.resolve(environmentPath(env)),
        '@modals': path.resolve('./src/modals'),
        '@pages': path.resolve('./src/pages'),
        '@theme': path.resolve('./src/theme')
    };

} else {

    // Default to dev config
    useDefaultConfig[env] = useDefaultConfig.dev;
    useDefaultConfig[env].resolve.alias = {
        '@app': path.resolve('./src/app'),
        '@core': path.resolve('./src/app/core'),
        '@shared': path.resolve('./src/app/shared'),
        '@assets': path.resolve('./src/assets'),
        '@env': path.resolve(environmentPath(env)),
        '@modals': path.resolve('./src/modals'),
        '@pages': path.resolve('./src/pages'),
        '@theme': path.resolve('./src/theme')
    };

}

function environmentPath(env) {
    var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red('\n' + filePath + ' does not exist!'));
    } else {
        return filePath;
    }
}

module.exports = function () {
    return useDefaultConfig;
};
