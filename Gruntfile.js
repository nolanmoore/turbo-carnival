'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var options = {
    paths: {
      app: 'app',
      dist: 'dist'
    }
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['src/app.js', 'src/components/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    copy : {
      dist : {
        files : [ {
          expand : true,
          dot    : false,
          cwd    : 'src',
          dest   : 'dist',
          src    : [ 'assets', '{,*/}*.html', 'styles/fonts/{,*/}*.*' ]
        }]
      },
      styles : {
        expand : true,
        dot    : false,
        cwd    : '<%= paths.app %>/styles',
        dest   : '.tmp/styles/',
        src    : '{,*/}*.css'
      }
    },
    clean: {
      dist: ['.tmp', 'dist']
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      build: ['Gruntfile.js', 'src/app.js', 'src/components/**/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'uglify',
    'copy:dist'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('serve', function (target) {
  if (target === 'dist') {
    return grunt.task.run(['build', 'connect:dist:keepalive']);
  }

  grunt.task.run([
    'clean:server',
    'ngconstant:development', // ADD THIS
    'bower-install',
    'concurrent:server',
    'autoprefixer',
    'connect:livereload',
    'watch'
  ]);
});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
