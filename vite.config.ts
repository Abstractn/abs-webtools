import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  base: '/abs-webtools/',
  build: {
    minify: 'terser',
    terserOptions: {
      keep_classnames: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        logger: {
          warn: function(message: string, options: { deprecation: boolean }) {
            if(options.deprecation) return;
            console.warn(message);
          }
        }
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src'),
    }),
  ],
}