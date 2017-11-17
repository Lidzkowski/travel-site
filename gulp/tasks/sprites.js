var gulp = require('gulp'), //variables needed for gulp tasks
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del');

var config = { // config object for making a sprite and css file for it
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
				}
			}
		}
	}

gulp.task('beginClean', function() { //clean old sprites folder and file when new icons are added
	return del(['./app/temp/sprites', './app/assets/images/sprites']);
})

gulp.task('createSprite', ['beginClean'], function() { //create a sprite from icons folder and css file to target each one
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprites/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() { //move sprite file to the imgages/sprites folder from app/temp
	return gulp.src('./app/temp/sprites/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() { //move css file to the modules folder from app/temp
	return gulp.src('./app/temp/sprites/css/*.css')
	.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del('./app/temp/sprites'); //remove the temp/sprites folder
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']); // task to execute all previuos tasks in a one