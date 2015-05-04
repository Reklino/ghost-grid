var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('sass', function() {
	return gulp.src('demo/sass/*.scss')
		.pipe(sass({
            includePaths: [
                'node_modules/susy/sass' //required for sass
            ]
        }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('demo/stylesheets'));

});

gulp.task('js', function() {
	return gulp.src('dist/ghost-grid.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(rename('ghost-grid.min.js'))
    	.pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
  gulp.watch('demo/sass/*.scss', ['sass'])
  gulp.watch('dist/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch']);