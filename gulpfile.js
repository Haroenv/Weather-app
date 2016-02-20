// Load plugins
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync');

// Styles
gulp.task('styles', function (cb) {
    gulp.src(['./src/css/reset.css', './src/css/font.css', './src/css/loading.css', './src/css/main.css', './src/css/nav.css', './src/css/cities.css', './src/css/search.css'])
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
});

// Scripts
gulp.task('scripts', function (cb) {
    gulp.src(['./src/js/weatherAppStart.js', './src/js/weatherAppLauncher.js', './src/js/weatherAppData.js', './src/js/weatherAppPage.js', './src/js/weatherAppTemplate.js', './src/js/weatherAppUx.js', './src/js/weatherAppRoutes.js', './src/js/weatherAppSupport.js', './src/js/weatherAppEnd.js'])
        .pipe(concat('weatherApp.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('worker', () =>
    gulp.src('src/js/templateWorker.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
);

// Default task
gulp.task('default', function () {
    gulp.start('styles', 'scripts', 'worker');
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/css/*.css', ['styles']);
    // Watch .js files
    gulp.watch('./src/js/*.js', ['scripts']);
    // Create LiveReload server
    gulp.watch({
        glob: 'dist/**'
    }, [browserSync.reload]);
});
