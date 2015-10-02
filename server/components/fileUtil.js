//var fs = require('fs');
//var mkdirp = require('mkdirp');
var multer = require('multer');

var UPLOAD_PATH = 'server/static/uploads'
exports.UPLOAD_PATH = UPLOAD_PATH;

var upload = multer({
    dest: UPLOAD_PATH
});

/*
var mkdir = function(path, callback) {

    fs.stat(path, function(err) {
        if (err === null) {
            callback();
        } else if (err.code === 'ENOENT') {
            mkdirp(path, callback);
        } else {
            throw err;
        }



    });

};
exports.mkdir = mkdir;

//creates new destPath folder
var moveFile = function(sourcePath, destPath, callback) {

    //mkdir(destPath, function(err) {
    // if (err) {
    //throw err;
    // }

    var source = fs.createReadStream(sourcePath);
    var dest = fs.createWriteStream(destPath);

    source.pipe(dest);
    source.on('end', callback);
    source.on('error', function(err) {
        throw err;
    });
    //});
};
exports.moveFile = moveFile;

var mkDirUploads = function(path, callback) {
    mkdir(UPLOAD_PATH + path, callback);
};
exports.mkDirUploads = mkDirUploads;
*/

var getUpload = function() {
    return upload;
};
exports.getUpload = getUpload;
