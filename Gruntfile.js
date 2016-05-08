'use strict';

module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    scsslint: 'grunt-scss-lint',
    ngtemplates: 'grunt-angular-templates'
  });

  var gruntConfig = {

    paths: {
      app: 'app',
      temp: '.tmp',
      dist: 'dist'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.app %>/app.js',
          '<%= paths.app %>/modules/*.js',
          '<%= paths.app %>/modules/**/*.js',
        ]
      }
    },

    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.app %>/app.js',
          '<%= paths.app %>/modules/*.js',
          '<%= paths.app %>/modules/**/*.js',
        ]
      }
    },

    prettysass: {
      options: {
        alphabetize: false
      },
      all: {
        src: '<%= paths.app %>/scss/*.scss'
      }
    },

    scsslint: {
      options: {
        colorizeOutput: true,
        reporterOutput: null
      },
      all: {
        src: '<%= paths.app %>/scss/*.scss'
      }
    },

    sass: {
      dist: {
        files: {
          '<%= paths.dist %>/gestigris-common.css': '<%= paths.app %>/scss/main.scss'
        }
      }
    },

    clean: {
      dev: '<%= paths.temp %>',
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.temp %>',
            '<%= paths.dist %>/*'
          ]
        }]
      },
      postDist: {
        files: [{
          dot: true,
          src: ['<%= paths.temp %>', '.sass-cache']
        }]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        expand: true,
        files: {
          '<%= paths.dist %>/gestigris-common.js': ['<%= paths.app %>/app.js', '<%= paths.app %>/modules/*.js', '<%= paths.app %>/modules/**/*.js']
        }
      }
    },

    ngtemplates: {
      dist: {
        src: '<%= paths.app %>/modules/**/views/*.html',
        dest: '<%= paths.dist %>/gestigris-common.js',
        options: {
          module: 'gestigris-common',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          append: true
        }
      }
    },

    copy: {
      icons: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/icons',
          src: '**',
          dest: '<%= paths.dist %>/icons'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/fonts',
          src: '**',
          dest: '<%= paths.dist %>/fonts'
        }]
      },
      translations: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/translations',
          src: '**',
          dest: '<%= paths.dist %>/translations'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= paths.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= paths.dist %>/fonts/{,*/}*.{eot,otf,ttf}',
            '<%= paths.dist %>/icons/{,*/}*.svg'
          ]
        }
      }
    },

    usemin: {
      js: ['<%= paths.dist %>/gestigris-common.js'],
      css: ['<%= paths.dist %>/gestigris-common.css'],
      options: {
        assetsDirs: ['<%= paths.dist %>/**/'],
        patterns: {
          js: [
            [/(icons\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved icons'],
            [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    autoprefixer: {
      dist: {
        expand: true,
        cwd: '<%= paths.dist %>',
        src: '*.css',
        dest: '<%= paths.dist %>'
      }
    },

    cssmin: {
      dist: {
        src: '<%= paths.dist %>/gestigris-common.css',
        dest: '<%= paths.dist %>/gestigris-common.min.css'
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: {},
        preserveComments: false
      },
      dist: {
        files: {
          '<%= paths.dist %>/gestigris-common.min.js': '<%= paths.dist %>/gestigris-common.js',
        }
      }
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('build', [
    'jshint:all',
    'jsbeautifier:all',
    'prettysass:all',
    'scsslint:all',
    'clean:dist',
    'sass:dist',
    'ngAnnotate:dist',
    'copy:icons',
    'imagemin:dist',
    'copy:fonts',
    'copy:translations',
    'rev:dist',
    'usemin',
    'autoprefixer:dist',
    'cssmin:dist',
    'ngtemplates:dist',
    'uglify:dist',
    'clean:postDist'
  ]);
};
