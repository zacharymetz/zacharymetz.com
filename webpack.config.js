const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const clientConfig = {
  mode: isDev ? 'development' : 'production',
  entry: './src/client.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.css$/,
                localIdentName: isDev 
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:8]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...(!isDev ? [new MiniCssExtractPlugin({
      filename: 'styles.css'
    })] : [])
  ]
};

const serverConfig = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.server.json'
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.css$/,
                localIdentName: isDev 
                  ? '[path][name]__[local]--[hash:base64:5]'
                  : '[hash:base64:8]',
                exportOnlyLocals: true  // Important for SSR
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = [clientConfig, serverConfig];