import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  define: {global: 'window'},
  plugins: [react(), tsconfigPaths()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        resolve(__dirname, 'src/chat-bubble.tsx')
      ],
      name: 'nexai-chat',
      // the proper extensions will be added
      fileName: (type: string, name: string) => {
        return type === 'es' ? `${name}.js` : `${name}.${type}.js`
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react',
        'mobx',
        'mobx-react-lite'
      ],
      output: {
        globals: {
          react: 'React',
          mobx: 'Mobx',
          'mobx-react-lite': 'MobxReactLite'
        }
      }
    },
  },
  server: {
    port: Number(process.env.PORT) || 8080
  },
  css: {
    modules: {
      localsConvention: 'camelCase' // Enable CSS Modules
    }
  }
})

