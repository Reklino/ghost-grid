var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


gulp.task('sass', function() {
    return gulp.src('demo/sass/*.scss')
        .pipe(sass({
            includePaths: [
                'node_modules/susy/sass' //required for sass
            ]
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('demo/stylesheets'))
        .pipe(reload({stream: true}));

});

gulp.task('css', function() {
    return gulp.src('demo/sass/ghost-grid.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist'))
        .pipe(minifyCSS())
        .pipe(rename('ghost-grid.min.css'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
})

gulp.task('js', function() {
    return gulp.src('dist/ghost-grid.js')
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(uglify())
        .pipe(rename('ghost-grid.min.js'))
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('demo/sass/*.scss', ['sass'])
    gulp.watch('dist/*.js', ['js']).on('change', reload);
    gulp.watch("demo/*.html").on('change', reload);
})

gulp.task('default', ['sass', 'css', 'js', 'watch']);