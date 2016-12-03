'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './app'
    });

    gulp.watch([
        './app/sass/*.scss',
        './app/sass/**/*.scss'
    ], ['sass']);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});


gulp.task('sass', function() {
    return gulp.src([
            './app/sass/*.scss',
            './app/sass/**/*.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./app/css'));
});
