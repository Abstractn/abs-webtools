export default {
  base: '/tools/dist/',
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  }
}