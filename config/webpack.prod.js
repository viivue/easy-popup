const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const {paths, packageInfo, bannerConfig, env} = require('./config');

/**
 * Sample variables: "cross-env TARGET=umd"
 * TARGET: libraryTarget
 */
const libraryTarget = env.TARGET || 'umd';
const isMinified = env.MIN === 'yes';
let filename, experiments = {}, library = undefined;
switch(libraryTarget){
    case "module":
        filename = `${packageInfo.outputFilename}.module.js`;
        experiments = {
            outputModule: true,
        };
        break;
    default:
        //library = `${packageInfo.codeName}`;
        if(isMinified){
            filename = `${packageInfo.outputFilename}.min.js`;
        }else{
            filename = `${packageInfo.outputFilename}.js`;
        }
}

module.exports = {
    mode: 'production',
    devtool: false,
    entry: {
        main: paths.entry,
        mainModule: paths.entry, // For ES module output
        mainTS: paths.entry // For TypeScript output
    },
    experiments,
    output: {
        filename: (pathData) => {
            const name = pathData.chunk.name;
            switch(name){
                case 'mainModule':
                    return `${packageInfo.outputFilename}.module.js`;
                case 'mainTS':
                    return `${packageInfo.outputFilename}.ts`;
                default:
                    return isMinified ? `${packageInfo.outputFilename}.min.js` : `${packageInfo.outputFilename}.js`;
            }
        },
        library,
        libraryTarget,
        umdNamedDefine: true,
        globalObject: 'this',
        path: paths.dist
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.BannerPlugin(bannerConfig)
    ],
    optimization: {
        minimize: isMinified,
        minimizer: [new TerserPlugin({extractComments: false})],
    },
};