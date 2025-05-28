import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';
import { HBS_HELPERS } from './src/script/hbs-helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  base: '/abs-webtools/dist/',
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  },
  server: {
    host: true,
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src'),
      helpers: HBS_HELPERS,
    }),
  ],
}