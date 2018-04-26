/*
example
[[folder name]]	 bond-revenue-source
[[file name]]	bond-revenue-source
[[entity name]]	BondRevenueSource
[[id value]]	bondRevenueSourceID
[[name literal]]	Bond Revenue Source
[[import path]]	bondrevenuesource
[[variable name]]	bondRevenueSource
[[const name]]	BONDREVENUESOURCE
*/
module.exports.generateVariables = function(value, plural) {
    value = value.replace(new RegExp(" ", "g"), "-").toLowerCase();
    return {
        "folder name": value,
        "file name": value,
        "entity name": _toPascalCase(value),
        "id value": _toCamelCase(value) + "ID",
        "name literal": _toLiteral(value),
        "import path": _toPureString(value).toLowerCase(),
        "variable name": _toCamelCase(value),
        "const name": _toPureString(value).toUpperCase(),
        "different plural": plural ? true : false,
        "plural variable name": plural ? _toCamelCase(plural) : "",
        "plural entity name": plural ? _toPascalCase(plural) : "",
        "plural name literal": plural ? _toLiteral(plural) : "",
        "plural const name": plural ? _toPureString(plural).toUpperCase() : ""
    };
}

var _toPureString = function(value){
    return value.replace(new RegExp("-", "g"), "");
}

var _toLiteral = function(value) {
    var substrs = value.split("-");
    for(var i = 0; i < substrs.length; i ++) {
        substrs[i] = substrs[i].substring(0,1).toUpperCase() + substrs[i].substring(1);
    }

    return substrs.join(" ");
}

var _toPascalCase = function(value) {
    return _toLiteral(value).replace(new RegExp(" ", "g"), "");
}

var _toCamelCase = function(value) {
    return value.substring(0,1).toLowerCase() + _toPascalCase(value).substring(1)
}