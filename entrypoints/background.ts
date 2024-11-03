export default defineBackground({
  type: 'module',
  main() {
    console.log(browser, import.meta.env);
  },
});
