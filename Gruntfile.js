module.exports = function(grunt) {
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		sass: {
	        dist: {
	            options: {
	                style: 'compressed',
					sourcemap: 'false'
	            },
	            files: {
	                'smoove.min.css': 'scss/*.scss'
	            }
	        } 
	    },
		
		autoprefixer: {
			dist: {
				files: {
					'smoove.min.css': 'smoove.min.css' 
				}
			}
		},
	
	    watch: {
	
	        css: {
				files: ['scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					spawn: false,
					livereload: true,
				}
			} 
	    },
		
	});

	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default',['watch']);
}
