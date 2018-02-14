const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.ENV;

if (env === 'prod' || env === 'dev') {

    useDefaultConfig[env].resolve.alias = {
        '@app': path.resolve('./src/app'),
        '@assets': path.resolve('./src/assets'),
        '@env': path.resolve(environmentPath(env)),
        '@mocks': path.resolve('./src/mocks'),
        '@pages': path.resolve('./src/pages'),
        '@modals': path.resolve('./src/modals'),
        '@services': path.resolve('./src/services'),
        '@theme': path.resolve('./src/theme')
    };

} else {

    // Default to dev config
    useDefaultConfig[env] = useDefaultConfig.dev;
    useDefaultConfig[env].resolve.alias = {
        '@app': path.resolve('./src/app'),
        '@assets': path.resolve('./src/assets'),
        '@env': path.resolve(environmentPath(env)),
        '@mocks': path.resolve('./src/mocks'),
        '@pages': path.resolve('./src/pages'),
        '@modals': path.resolve('./src/modals'),
        '@services': path.resolve('./src/services'),
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
