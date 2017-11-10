var gulp = require('gulp'), // variables
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import');

gulp.task('default', function() {  // default gulp
	console.log("Hooray - you created a GULP task");
});

gulp.task('html', function() { // html watch task console info
	console.log("Imagine something useful being done with your HTML here.");
});

gulp.task('styles', function() { // gulp tasks for css
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {  // task triggers when wathed files saves
	watch('./app/index.html', function() {
		gulp.start('html');
	});
	
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('styles');
	});
	
});