var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

gulp.task('less_compile', function(){
    gulp.src([
            
        ])
        .pipe(less({
            paths: [
                'less/style.less',
                'includes/vc-elements/'
            ]
        }))
        .pipe(concat('css/allmin.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/'));
});

gulp.task('uglify', function (){
    gulp.src('lib/*.js')
        .pipe( uglify() )
        .pipe( gulp.dest('dist') );
});

gulp.task('watch', function () {
    gulp.watch('less/**/*.less', ['less_compile']);
});


defined_tasks = [
    // 'babel',
    'uglify:pack_combine',
    'uglify:pack_compress',
    'uglify:scripts_compress',
    'cssmin',
    'less:compile',
    'watch'
];

gulp.task('default', [ 'less_compile', 'watch' ]);