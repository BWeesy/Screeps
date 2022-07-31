var Auth = require('./Auth');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        screeps: {
            options: {
                email: Auth.email,
                token: Auth.token,
                branch: 'default',
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            } 
        },
        copy: {
            js: {
                files: [
                    { expand:true, flatten: true, cwd: 'src', src: '**', dest : 'dist/' }
                ]
            }
        },
        clean: {
            dist: ['dist']
        }
    });

    grunt.registerTask('build', ['clean:dist', 'copy:js']);
    grunt.registerTask('deploy', ['build', 'screeps']);
}