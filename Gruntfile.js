module.exports = function(grunt) {
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		sass: {
	        dist: {
	            options: {
	                style: 'compressed',
					sourcemap: 'none'
	            },
	            files: {
	                'smoove.min.css': 'scss/build.scss'
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
				tasks: ['sass','autoprefixer'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			docs: {
				files: ['./docs/**/*.html'],
				tasks: ['htmlbuild'],
				options: {
					spawn: false,
					livereload: true
				}
			}
	    },
		
		htmlbuild: {
        	dist: {
            	src: './docs/build.html',
            	dest: './index.html',
            	options: {
                	beautify: false,
                	sections: {
						demo_modal: './docs/modules/modals_demo.html',
						
                    	base_typography: './docs/base/typography.html',
						base_forms: './docs/base/forms.html',
						base_tables: './docs/base/tables.html',
						base_icons: './docs/base/icons.html',
						
						object_utilities: './docs/objects/utilities.html',
						object_pull_floats: './docs/objects/pull_floats.html',
						object_nudge_pad_push: './docs/objects/nudge_pad_push.html',
						object_breadcrumbs: './docs/objects/breadcrumbs.html',
						object_buttons: './docs/objects/buttons.html',
						object_cards: './docs/objects/cards.html',
						object_navs: './docs/objects/navs.html',
						object_stat_stacks: './docs/objects/stat_stacks.html',
						object_ui_messages: './docs/objects/ui_messages.html',
						object_dropdowns: './docs/objects/dropdowns.html',
						
						modules_grids: './docs/modules/grids.html',
						modules_tabs: './docs/modules/tabs.html',
						modules_modals: './docs/modules/modals.html',
						modules_toasts: './docs/modules/toasts.html',
						
						layouts_app_frame: './docs/layouts/app_frame.html',
						layouts_centered_site: './docs/layouts/centered_site.html'
                	}
            	}
        	}
    	}
		
	});

	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-build');


	grunt.registerTask('default',['watch']);
}
