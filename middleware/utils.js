var fs= require("fs");
var path = require("path");

module.exports.rmkdirSync = function(dirpath) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) { 
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }
                else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp)) {
                        return false;
                    }
                }
            });
        }
        return true; 
    } catch(e) {
        log.error("create director fail! path=" + dirpath +" errorMsg:" + e);        
        return false;
    }
}