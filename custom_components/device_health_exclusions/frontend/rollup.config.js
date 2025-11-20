import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/device-health-panel.ts',
  output: {
    file: '../www/device-health-panel.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
  ],
};
