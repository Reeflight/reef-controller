'use strict';

const {task, series, src, dest} = require('gulp');
const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');

let cache;

task('rollup', () => {
  return rollup({
    entry: 'src/index.js',
    // Use the previous bundle as starting point.
    cache: cache
  }).then(bundle => {
    // Cache our bundle for later use (optional)
    cache = bundle;

    bundle.write({
      format: 'cjs',
      plugins: [
        babel({
          presets: [
            [
              'es2015',
              {modules: false}
            ]
          ],
          plugins: [
            'external-helpers'
          ]
        })
      ],
      dest: 'dist/reef-controller.js'
    });
  });
});

task('build', series('rollup'));

task('default', series('build'));
