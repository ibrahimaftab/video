const { series, parallel, src, dest } = require("gulp");
const uglify = require("gulp-uglify")
const fileinclude = require("gulp-file-include")
// const babel = require("gulp-babel")

const main = series(function (cb) {
  src("./src/js/videoMania.js")
    .pipe(
      fileinclude({
        prefix: "~",
        basepath: "@file",
      })
    )
    // .pipe(
    //   babel({
    //     presets: ["@babel/preset-env"],
    //   })
    // )
    .pipe(uglify())
    .pipe(dest('./dist/js/'));
  cb();
});

const all = series(function(cb) {
  src([
    "./src/js/**/*.js",
    
    // Skipping main task files below
    "!./src/js/videoMania.js",
    "!./src/js/components/player.js",
    "!./src/js/events.js"
  ])
    .pipe(uglify())
    .pipe(dest('./dist/js/'))
  cb()
})

exports.build = parallel(main, all);
