/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
 export default ({ mode }) => {
  const e = {...process.env, ...loadEnv(mode, process.cwd())};
  
  return defineConfig({
    css: {
      postcss: './postcss.config.js',
    },
    base: e.VITE_BASE_URL,
    plugins: [react()],  
   });
}
