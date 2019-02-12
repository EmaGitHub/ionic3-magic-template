const chalk = require('chalk');
const fs = require('fs');

const env = process.env.ENV || 'prod';
const envBuildPath = './src/environments/_environment.BUILD.ts';

var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, envBuildPath);
    console.log(chalk.yellow('\n ' + env + ' environment selected for BUILD!'));
}
else {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
}
