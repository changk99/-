import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest() {
    // console.log('manifest 配置', env)
    return {
      name: '收藏夹快速搜索',
      permissions: ['storage'],
    };
  },
});
