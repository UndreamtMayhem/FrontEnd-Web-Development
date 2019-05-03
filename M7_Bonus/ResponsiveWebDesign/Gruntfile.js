/*
  "grunt"creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

    grunt.initConfig({

        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{

                            width: 300,
                            suffix: '_small',
                            quality: 50
                        }, {

                            width: 600,
                            suffix: '_medium',
                            quality: 30
                        }, {
                            name: 'large-x1',
                            width: 800,
                            suffix: '_large_1x',
                            quality: 30
                        },

                        {
                            name: 'large-x2',
                            width: 1600,
                            suffix: '_large_2x',
                            quality: 30
                        }
                    ]
                },

                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'images_src/',
                    dest: 'images/'
                }]
            }
        },


        /*
            image_resize: {
              resize: {
                options: {
                    upscale: true,
                    height: 1000,
                            },
                src: ['*.{gif,jpg,png}'],
                cwd: 'images_src/',
                dest: 'images/',
    
              },
    
                
            },
    
        */

        /* Clear out the images directory if it exists */
        clean: {
            dev: {
                src: ['images'],
            },
        },

        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['images']
                },
            },
        },

        /* Copy the "fixed" images that don't go through processing into the images/directory */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: 'images_src/fixed/*.{gif,jpg,png}',
                    dest: 'images/'
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};