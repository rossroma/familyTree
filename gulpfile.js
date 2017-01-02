// Include gulp
var gulp = require('gulp');

var uglify = require('gulp-uglify');  //加载js压缩

// 定义一个任务 compass
gulp.task('compass', function () {
    gulp.src(['js/*.js','!js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));  //输出文件
});

var minify = require('gulp-minify-css');

gulp.task('cssmini', function () {
    gulp.src(['css/*.css', '!css/*.min.css'])  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('assets/css/'));
});

var htmlmini = require('gulp-minify-html');

gulp.task('htmlmini', function () {
    gulp.src('*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('assets/'));
})

gulp.task('copy', function () {
    gulp.src('plugin/*.*')
        .pipe(gulp.dest('assets/plugin/'));
})

gulp.task('default', ['compass', 'cssmini', 'htmlmini', 'copy']);