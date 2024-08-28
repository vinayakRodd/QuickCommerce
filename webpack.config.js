module.exports = {
    // other configuration options...
    resolve: {
      fallback: {
        "querystring": require.resolve("querystring-es3"),
      },
    },
  };