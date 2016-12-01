const path = require('path');

module.exports = {
  context: __dirname,
  entry: './js/mainScene.js',
  output: {
    path: path.join(__dirname, 'js', 'bundle'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-maps'
};
