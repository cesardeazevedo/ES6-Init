var gulp  = require('gulp')
  , browserify = require('browserify')
  , babelify =  require('babelify')
  , browserSync = require('browser-sync')
  , harp  = require('harp')
  , shell = require('gulp-shell')
  , source = require('vinyl-source-stream');


gulp.task('server', function(){
    harp.server(__dirname, {
        port: 9000
    }, function () {
        browserSync({
        proxy: "localhost:9000",
        open: false,
        });
    });
});

gulp.task('script', function(){
    return gulp.src('public/app/app.js', { read: false })
    .pipe(shell([
        'jspm bundle-sfx app/app public/dist/app.min.js'
    ]));
});


gulp.task('watch', function(){

    //Watch jade files
    gulp.watch(['app/views/**/*.jade', 'public/modules/**/*.jade'], function(){
        browserSync.reload();
    });
    //Watch sass files
    gulp.watch('public/css/*.sass', function(){
        browserSync.reload();
    });
    //Watch js files
    gulp.watch('public/app/**/*.js', ['script'], function(){
        browserSync.reload();
    });
});


gulp.task('default', ['script', 'server', 'watch']);
