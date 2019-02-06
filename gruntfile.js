module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					//jQuery: true,
					console: true,
					module: true
				}
			},
			files: ['xbbcode.js']
		},

		uglify: {
			options: {
				output: {
					comments: '/^!/'
				}
			},
			main: {
				files: {
					'xbbcode.min.js': 'xbbcode.js'
				}
			}
		},

		cssmin: {
			main: {
				files: {
					'xbbcode.min.css': 'xbbcode.css'
				}
			}
		},

		copy: {
			main: {
				files: [{
					src: ['xbbcode.js', 'xbbcode.css'],
					dest: 'examples/'
				}]
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'examples'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			main: {
				files: ['xbbcode.js'],
				tasks: ['check', 'minify', 'copy'],
				options: {
					atBegin: true
				}
			},
		},

		clean: ['examples/xbbcode.js', 'examples/xbbcode.css']

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('check', 'jshint');
	grunt.registerTask('minify', ['uglify', 'cssmin']);
	grunt.registerTask('server', ['copy', 'connect', 'watch']);
	grunt.registerTask('default', ['check', 'minify', 'server']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};