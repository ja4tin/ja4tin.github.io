module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'y',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    rules: {
      cur: {
        test: /\.cur$/,
        use: [{
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    }
  }
}
