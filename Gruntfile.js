'use strict';


module.exports = function(grunt){
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var path = require('path');

  grunt.initConfig({
    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        cwd: 'public',
        src: ['**/*.html','img/**/*.*'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['public/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['test/client/**/*test.js'],
        dest: 'test/test_bundle.js',
        options: {
          transform: ['debowerify']
        }  
      }
    },

    express: {
        all: {
            options: {
                server: path.resolve(__dirname, 'server.js'),
                port: 3000,
                hostname: "localhost",
                livereload: true
            }
        }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.scss'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },
    // grunt-watch will monitor the projects files
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
                files: ['public/**/*.html',"public/**/*.scss","public/**/*.js"],
                options: {
                    livereload: true
                },
                tasks: ['build:dev']
        }
    },

    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        all: {
            path: 'http://localhost:3000'
        }
    }
  });
  grunt.registerTask('build:dev', ['clean:dev', 'browserify:dev', 'sass','copy:dev']);
  grunt.registerTask('serve', ['express', 'open', 'watch']);
};
