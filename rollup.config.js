import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/riber.js',
    name: 'riber',
    format: 'umd',
    sourceMap: true,
    strict: true,
  },
  plugins:[
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    eslint(),
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['env', {
          modules: false,
          loose: true,
          exclude: ['transform-es2015-typeof-symbol'],
          targets: {
            browsers: ['last 2 versions', 'IE >= 9']
          }
        }]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ],
};