module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Compile Pug to HTML
      pug: {
        compile: {
          files: {
            'dist/index.html': 'src/pug/index.pug',
          },
        },
      },
  
      // Compile SCSS to CSS
      sass: {
        dist: {
          files: {
            'dist/css/style.css': 'src/scss/style.scss',
          },
        },
      },
  
      // Add CSS prefixes
      autoprefixer: {
        options: {
          browsers: ['last 2 versions'],
        },
        dist: {
          src: 'dist/css/style.css',
          dest: 'dist/css/style.css',
        },
      },
  
      // Minify CSS
      cssmin: {
        target: {
          files: {
            'dist/css/style.min.css': 'dist/css/style.css',
          },
        },
      },
  
      // Concatenate and minify JS
      concat: {
        dist: {
          src: 'src/js/*.js',
          dest: 'dist/js/main.min.js',
        },
      },
      uglify: {
        dist: {
          files: {
            'dist/js/main.min.js': 'dist/js/main.min.js',
          },
        },
      },
  
      // Live reload
      browserSync: {
        dev: {
          bsFiles: {
            src: ['dist/**/*'],
          },
          options: {
            watchTask: true,
            server: './dist',
          },
        },
      },
  
      // Watch for changes
      watch: {
        pug: {
          files: 'src/pug/*.pug',
          tasks: ['pug'],
        },
        sass: {
          files: 'src/scss/*.scss',
          tasks: ['sass', 'autoprefixer', 'cssmin'],
        },
        js: {
          files: 'src/js/*.js',
          tasks: ['concat', 'uglify'],
        }
      },
    });
  
    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Default task
    grunt.registerTask('default', ['browserSync', 'watch']);
    // Build task
    grunt.registerTask('build', ['pug', 'sass', 'autoprefixer', 'cssmin', 'concat', 'uglify']);
  };