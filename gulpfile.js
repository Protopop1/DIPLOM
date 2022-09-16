"use strict";

//Подключение плагинов

const gulp = require('gulp');
const pug = require('gulp-pug');
const scss = require('gulp-sass')(require('sass'));
const autopref = require('gulp-autoprefixer');
const browserS = require('browser-sync');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

// Конфигурация (пути и дефолтные файлы)

const CONFIG = {
    compile: {
        pug: 'dev/pug/bio/index.pug',          //при создании страницы и работе с ней добавляем на нее путь
        scss: 'dev/scss/**/*.scss'
    },

    watch: {
        basePath: 'app/',
        pug: 'dev/pug/**/*.pug',
        scss: 'dev/scss/**/*.scss'
    }
}

gulp.task('pug', () => {
    return gulp.src(CONFIG.compile.pug)
        .pipe(pug({pretty: true}))
        .pipe(debug('HTML update'))
        .pipe(gulp.dest('app/bio/'))           //при создании страницы и работе с ней добавляем на нее путь
})

gulp.task('scss', () => {
    return gulp.src(CONFIG.compile.scss)
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(debug('Style compile'))
        .pipe(autopref())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
})

gulp.task('watch', () => {
    gulp.watch([CONFIG.watch.pug, CONFIG.watch.scss], gulp.parallel('pug', 'scss'))
})

gulp.task('server', gulp.parallel('watch', () => {
    browserS.init({
        server: {
            baseDir: 'app/',
        },
        browser: ['Chrome']
    })

    gulp.watch(CONFIG.watch.basePath + '**/*.*').on('change', browserS.reload)
}))

gulp.task('css', () =>{
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('app/css'))
    }
)
