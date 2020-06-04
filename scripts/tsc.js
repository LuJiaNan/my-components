"use strict";

const fs = require('fs-extra');
const {spawnSync,spawn,exec} = require('child_process');
// fs.readdirSync('lib').map((file) => {
//   fs.unlink(`lib/${file}`,(err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('delete ok');
//     }
//   });
// });
// fs.rmdir('lib',(err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('ok');
//   }
// });

// var exec = require('child_process').exec;

// exec('rm -rf lib',function(err,out) {
//   console.log(out); err && console.log(err);
// });

// deleteFolder("lib");
// function deleteFolder(path) {
//   var files = [];
//   if (fs.existsSync(path)) {
//     files = fs.readdirSync(path);
//     files.forEach(function (file, index) {
//       var curPath = path + "/" + file;
//       if (fs.statSync(curPath).isDirectory()) {
//         // recurse
//         deleteFolder(curPath);
//       } else {
//         // delete file
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.rmdirSync(path);
//   }
// }


fs.removeSync('./lib');
exec('tsc', ['--noEmit', 'false', '--outDir', './es'])