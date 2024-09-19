export default {
  base: '/abs-webtools/dist/',
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  }
}