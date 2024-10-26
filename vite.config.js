import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // base:"/alphaforums/",
  // root: 'src',
  // build: {
  //   outDir: '../dist',
  //   emptyOutDir: true, // also necessary
  // },
  plugins: [react()],
})
