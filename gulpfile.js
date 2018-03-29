'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var mmq = require('gulp-merge-media-queries');

var imageResize = require('gulp-image-resize');
var imageOptim = require('gulp-imageoptim');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


// compile
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
  	.pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    	browsers: ['last 2 version'],
        cascade: false
    }))
    .pipe(mmq({ log: true }))
    .pipe(notify('SCSSをコンパイルしたよ〜'))
    .pipe(gulp.dest('./css'));
});

// browserSync
gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html"
		},
		notify: false
	});
});

gulp.task('bs-reload', function(){
	browserSync.reload();
});

// watch
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./scss/**/*.scss', ['sass', 'bs-reload']);
  gulp.watch('*.html', ['bs-reload']);
});


// compress img
gulp.task('minifyIMG', function() {
	return gulp.src('./img/**/*')
		.pipe(imageResize({
			width: 1500,
			imageMagick: true
		}))
		.pipe(imageOptim.optimize({
			jpegmini: true
		}))
		.pipe(gulp.dest('public/img'));
});

// compress js
gulp.task('minifyJS', function(cb){
	pump([
		gulp.src('./js/*.js'),
		uglify(),
		rename({ extname: ".min.js" }),
		gulp.dest('./public/js')
		],
	cb
	);
});

// compress html
gulp.task('minifyHTML', function() {
	return gulp.src('*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./public'))
});

// compress css
gulp.task('minifyCSS', function(){
	return gulp.src('./css/*.css')
		.pipe(cleanCSS())
		.pipe(rename({ extname: ".min.css" }))
		.pipe(gulp.dest('./public/css'))
});


// compress all
gulp.task('minifyAll', ['minifyIMG', 'minifyJS', 'minifyHTML', 'minifyCSS']);


