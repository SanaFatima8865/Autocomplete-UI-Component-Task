const path = require('path');

const ROOT = path.resolve(__dirname,'src');
const DESTINATION = path.resolve(__dirname,'dist');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [ROOT]
            }
        ]
    },
    output: {
        publicPath: 'dist',
        filename: 'bundle.js',
        path: DESTINATION
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
      },
}