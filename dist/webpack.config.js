// webpack.config.js
module.exports = {
    // ... other configuration options ...
  
    module: {
      rules: [
        // ... other rules ...
  
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
  