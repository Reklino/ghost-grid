var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');


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
	return gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

gulp.task('watch', function() {
  gulp.watch('demo/sass/*.scss', ['sass'])
  gulp.watch('src/*.js', ['js'])
})

gulp.task('default', ['sass', 'js', 'watch']);