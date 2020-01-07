const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
  entry: {
    'main': './example/main.tsx'
  },
  devServer: {
    port: 5100
  },
  module: {
    rules: [
      {
        test: /\.ts(x*)$/,
        loader: 'ts-loader',
        options: {
          configFile: './tsconfig.example.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/public/index.html'
    })
  ]
};

module.exports = CONFIG;
