'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
    gulp.src('app/scripts/**/*.js')
        .pipe($.modernizr({
            options: [ 'html5printshiv' ],
            tests: [ 'webgl' ]
        }))
        .pipe($.size())
        .pipe(gulp.dest('web/'));

    return gulp.src('app/scripts/main.js')
        .pipe($.webpack({
            module: { preLoaders: [ { loader: 'jshint-loader' } ] },
            jshint: { devel: true },
            output: { filename: "bundle.js" }
        }))
        .pipe($.size())
        .pipe(gulp.dest('web/'));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('web/'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('web'))
        .use(connect.directory('web'))

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('watch', ['connect'], function () {
    var server = $.livereload();

    gulp.watch([
        'web/*.html',
        'web/*.js',
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/*.html', ['html']);
});
