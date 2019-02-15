module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					console: true,
					module: true
				}
			},
			files: ['src/xbbcode.js']
		},

		uglify: {
			options: {
				output: {
					comments: '/^!/'
				}
			},
			main: {
				files: {
					'dist/xbbcode.min.js': 'src/xbbcode.js'
				}
			}
		},

		cssmin: {
			main: {
				files: {
					'dist/xbbcode.min.css': 'src/xbbcode.css'
				}
			}
		},

		copy: {
			main: {
				expand: true,
				cwd: 'dist/',
				src: ['**'],
				dest: 'docs/'
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'docs'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			main: {
				files: ['src/xbbcode.js'],
				tasks: ['check', 'minify', 'copy'],
				options: {
					atBegin: true
				}
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('check', 'jshint');
	grunt.registerTask('minify', ['uglify', 'cssmin']);
	grunt.registerTask('server', ['copy', 'connect', 'watch']);
	grunt.registerTask('default', ['check', 'minify', 'server']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};
