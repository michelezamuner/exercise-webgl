'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
    //return gulp.src('app/scripts/**/*.js')
    //    .pipe($.jshint())
    //    .pipe($.jshint.reporter(require('jshint-stylish')))
    //    .pipe($.size());
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('watch', ['connect'], function () {
    var server = $.livereload();

    gulp.watch([
        'app/*.html',
        'app/scripts/**/*.js',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
});
