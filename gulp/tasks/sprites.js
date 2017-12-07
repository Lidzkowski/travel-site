var gulp = require('gulp'), //variables needed for gulp tasks
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del'),
	svg2png = require('gulp-svg2png');

var config = { // config object for making a sprite and css file for it
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render) {
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
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
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
})

gulp.task('createSprite', ['beginClean'], function() { //create a sprite from icons folder and css file to target each one
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createSprite', 'createPngCopy'], function() { //move sprite file to the imgages/sprites folder from app/temp
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createPngCopy'], function() { //move css file to the modules folder from app/temp
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del('./app/temp/sprite'); //remove the temp/sprites folder
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteCSS', 'copySpriteGraphic',  'endClean']); // task to execute all previuos tasks in a one