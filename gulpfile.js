
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify'),
    notify = require('gulp-notify');

//HTML Task
gulp.task('html' , function(){
    return gulp.src(['stage/html/*.pug' , 'stage/html/*.html'])
        // .pipe(pug({ pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(notify('HTML TASK FINISHED !'))
        .pipe(livereload())
});

//CSS Task
gulp.task('css' , function(){
    return gulp.src(['stage/css/**/*.scss' , 'stage/css/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error' , sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('CSS TASK FINISHED !'))
        .pipe(livereload())
});

//JS Task
gulp.task('js' , function(){
    return gulp.src('stage/js/*.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('JS TASK FINISHED !'))
        .pipe(livereload())
});

//Watch Task
gulp.task('watch' , function(){
    require('./server');
    livereload.listen();
    gulp.watch(['stage/html/*.pug' , 'stage/html/*.html'] , gulp.series('html'));
    gulp.watch(['stage/css/**/*.scss' , 'stage/css/**/*.css'] , gulp.series('css'));
    gulp.watch('stage/js/*.js' , gulp.series('js'));
});
