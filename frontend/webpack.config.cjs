const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.jsx', // Replace with your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Include both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react' // Ensure this preset is included
            ]
          }
        }
      },
      {
        test: /\.css$/, // For handling CSS files
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // For handling image files including WebP
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Resolve these extensions
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false // Prevents the report from automatically opening in the browser
    })
  ],
  optimization: {
    minimize: true, // Minify the output
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin() // Minify CSS
    ],
    splitChunks: {
      chunks: 'all', // Split all chunks
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}` // Separate runtime code
    }
  },
  devtool: 'source-map' // Generate source maps for better debugging
};
