const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Fix expo-router path resolution issue
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
  };

  return config;
};
