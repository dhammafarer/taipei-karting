var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.browserify('main.js')
      .sass([ 'app.scss', '../../../node_modules/font-awesome/scss/font-awesome.scss' ])
      .styles(['../../../public/css/app.css', 'fontello/fontello.css'])
      .copy( 'resources/assets/fonts/fontello', 'public/font' )
      .browserSync({ proxy: 'tika.com' });
});
