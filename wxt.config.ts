import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest() {
    return {
      name: '收藏夹快速搜索',
      permissions: ['storage', 'bookmarks'],
      omnibox: {
        keyword: 'cls',
      },
      minimum_chrome_version: '88',
    };
  },
});
