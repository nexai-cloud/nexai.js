import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from "vite-tsconfig-paths";
// import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: [
      'window',
      'document'
    ],
    'process.env.NODE_ENV': '"production"', 
  },
  plugins: [
    react({
      tsDecorators: true
    }), 
    tsconfigPaths(),
    // libInjectCss(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        resolve(__dirname, 'index.ts'),
        // resolve(__dirname, 'src/lib/nexai.ts')
      ],
      name: 'nexai-chat',
      // the proper extensions will be added
      fileName: (type: string, name: string) => {
        return `${name}.${type}.js`
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        // 'react/jsx-runtime',
        'react',
        'react-dom',
        'mobx',
        'mobx-react-lite'
      ]
    },
  },
  server: {
    port: Number(process.env.PORT) || 3000
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
    modules: {
      localsConvention: 'camelCase' // Enable CSS Modules
    }
  }
})

