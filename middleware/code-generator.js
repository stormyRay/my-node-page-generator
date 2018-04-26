var fs= require("fs");
var path = require("path");
var utils = require("./utils");
var config = require("../config/configuration");
var filesToBeModified = require("../config/modification-config");

module.exports.generate = function(variables) {

    
    //if dest target doesen't exist, create it
    if(fs.existsSync(path.join(config.appPath, "pages", variables["folder name"]))){
        return {
            success: false,
            message: "Page existed!"
        };
    } else {
        utils.rmkdirSync(path.join(config.appPath, "pages", variables["folder name"]));
    }

    var files = _findFiles('../public/templates');
    //create all replaced files
    files.forEach(function(el, index) {
        _createFile(variables, el);
    });

    //modify existed files
    filesToBeModified.forEach(function(val, index) {
        _modifyExistedFile(variables, val);
    });

    return {success: true};
} 

var _findFiles = function(rootPath) {
    var array = [];
    var findFilesInFolder = function(folder) {
        var currentDir = path.join(__dirname, path.join(rootPath, folder))
        var files = fs.readdirSync(currentDir);
        files.forEach(function(val, index) {
            var currentTarget = path.join(currentDir, val);
            var stats = fs.statSync(currentTarget);
            if (stats.isDirectory()) {
                array.push({
                    type: "folder",
                    value: path.join(folder, val)
                });
                findFilesInFolder(path.join(folder, val));
            }

            if (stats.isFile()) {
                array.push({
                    type: "file",
                    value: path.join(folder, val)
                });
            }
        });
    }

    findFilesInFolder(".");
    return array;
} 

var _modifyExistedFile = function(variables, fileConf) {
    var filePath = fileConf.file;
    var origContent = _getFileString(path.join(config.appPath, filePath));
    var newContent = origContent;
    fileConf.changes.forEach(function(change) {
        var marker = "/*" + change.mark + "*/";
        var insertedContent = _replaceVarInTpl(variables, change.template);
        newContent = newContent.replace(marker, insertedContent + "\n" + marker);
    });

    fs.writeFileSync(path.join(config.appPath, filePath), newContent);
}

var _createFile = function(variables, element) {
    if (element.type === "file") {
        var relativePath = element.value
        var tplContent = _getFileString(path.join(__dirname, '../public/templates', relativePath));
        var content = _replaceVarInTpl(variables, tplContent);
        if(variables["different plural"]) {
            content = content.replace(new RegExp(variables["variable name"] + "s", "g"), variables["plural variable name"]);
            content = content.replace(new RegExp(variables["entity name"] + "s", "g"), variables["plural entity name"]);
            content = content.replace(new RegExp(variables["const name"] + "s", "g"), variables["plural const name"]);
            content = content.replace(new RegExp(variables["name literal"] + "s", "g"), variables["plural name literal"]);
        }
        fs.writeFileSync(path.join(config.appPath, relativePath.replace("[[foldername]]", variables["folder name"]).replace("fn", variables["file name"])), content);
    } else if (element.type === "folder") {
        utils.rmkdirSync(path.join(config.appPath, element.value.replace("[[foldername]]", variables["folder name"])));
    }
};
    
var _replaceVarInTpl = function(variables, template) {
    var props = Object.keys(variables);
    for(var i = 0; i < props.length; i ++) {
        var value = variables[props[i]];
        template = template.replace(new RegExp("\\[\\[" + props[i] + "\\]\\]", "g"), value);
    }
    return template;
};

var _getFileString = function(filePath) {
    return fs.readFileSync(filePath, "utf-8");
}