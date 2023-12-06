const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'W_Site',
    themeColor: '#6c7c94',
  },
});
