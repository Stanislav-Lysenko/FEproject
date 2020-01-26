const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const uglify = require('gulp-uglify');

const DEV =  Boolean(process.env.DEV) || false;

var path = {
	build: {
		html: 'build/',
		css: 'build/css/',
		img: 'build/img/',
		webfonts: 'build/webfonts/',
		js: 'build/js/',
		external: 'build/external/',
		json: 'build/json/'
	},
	src: {
		html: 'src/*.html',
		style: 'src/sass/style.scss',
		img: 'src/img/*.*',
		js: 'src/js/main.js',
		external: 'src/external/*.*',
		json: 'src/json/*.json'
	},
	watch: {
		html: 'src/*.html',
		style: 'src/sass/**/*.scss',
		img: 'src/img/*.*',
		js: 'src/js/**/*.js',
		json: 'src/json/*.json'
	}
}

gulp.task('clean:build', () =>
	gulp.src('build/*', {read: false,})
		.pipe(clean({force: true,}))
)

gulp.task('build:css', () =>
	gulp.src(path.src.style)
		.pipe(gulpif( DEV, sourcemaps.init()))
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe( gulpif(!DEV, cssmin()))
		.pipe( gulpif(DEV, sourcemaps.write('./')))
		.pipe( gulp.dest(path.build.css))
);

gulp.task('build:html', () =>
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
);

gulp.task('build:js', () =>
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulpif( DEV, sourcemaps.init()))
		.pipe(gulpif(!DEV, uglify() ))
		.pipe(gulpif(DEV, sourcemaps.write()))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.build.js))
)

gulp.task('external:lib', () =>
		gulp.src(path.src.external)
			.pipe(gulp.dest(path.build.external))
)

gulp.task('build:json', () =>
	gulp.src(path.src.json)
		.pipe(gulp.dest(path.build.json))
)

gulp.task('build:img', () =>
	gulp.src(path.src.img)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(path.build.img))
)

gulp.task('watch', () => {
	gulp.watch(path.watch.html, gulp.parallel('build:html'));
	gulp.watch(path.watch.style, gulp.parallel('build:css'));
	gulp.watch(path.watch.js, gulp.parallel('build:js'));
	gulp.watch(path.watch.json, gulp.parallel('build:json'));
	gulp.watch(path.watch.img, gulp.parallel('build:img'));
});

gulp.task( 'default', gulp.series( 'clean:build', 'external:lib','build:html', 'build:css', 'build:json', 'build:img', 'build:js', gulp.parallel('watch')));