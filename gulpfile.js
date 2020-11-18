var gulp = require("gulp")
var browserSync = require("browser-sync").create()
var webpack = require("webpack-stream")

// Move any html files to dist folder for deploy
gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})
// Move any files in js foler to dist folder for deploy
gulp.task("js", function () {
    gulp.src("src/js/app.js")
        .pipe(webpack({
            mode: 'production',
            devtool: 'source-map',
            output: {
                filename: "app.js"
            }
        }))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
})

// Watches files for changes
gulp.task("watch", function () {
    // While "watch"ing files - loads live server with website preview coming from "dist" folder
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    // If any ".html" file is updated then reruns gulp html task to move files to dist folder and also updates live server
    gulp.watch("src/*.html", ["html"])
        .on("change", browserSync.reload)
    // If js folder is updated then reruns gulp js task and move files to dist folder
    gulp.watch("src/js/*", ["js"])
})

// Runs all the following tasks on "gulp" command
gulp.task("default", ["html", "js", "watch"])