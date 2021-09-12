"use strict";

// Load plugins
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require('gulp-sass');

// Load package.json for banner
const pkg = require('./package.json');

// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// CSS task
function css() {
  return gulp
      .src("scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(header(banner, {
      pkg: pkg
    }))
      .pipe(gulp.dest("css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
      .pipe(gulp.dest("css"))
}

// Watch files
function watchFiles() {
    gulp.watch("scss/**/*", css);
    gulp.watch("css/**/*");
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, css);
const watch = gulp.series(build, gulp.parallel(watchFiles));

// Export tasks
exports.css = css;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
