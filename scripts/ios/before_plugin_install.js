var execSync = require('child_process').execSync;
var semver = require('semver');
var path = require("path");
const { parsePluginXml, writeJsonToXmlFile, getPluginId, parsePluginVariables, setContext } = require('../lib/utilities');

var pluginVariables = {};

var minCocoapodsVersion = "^1.11.2";

module.exports = function(context) {
    checkCocoapodsVersion();

    setContext(context);

    //get platform from the context supplied by cordova
    var platforms = context.opts.cordova.platforms;

    pluginVariables = parsePluginVariables();
};

function checkCocoapodsVersion(){
    var version;
    try{
        version = execSync('pod --version', {encoding: 'utf8'}).match(/(\d+\.\d+\.\d+)/)[1];
    }catch(err){
        throw new Error("cocoapods not found - please install cocoapods >="+minCocoapodsVersion);
    }

    if(!semver.valid(version)){
        throw new Error("cocoapods version is invalid - please reinstall cocoapods@"+minCocoapodsVersion + ": "+version);
    }else if(!semver.satisfies(version, minCocoapodsVersion)){
        throw new Error("cocoapods version is out-of-date - please update to cocoapods@"+minCocoapodsVersion + " - current version: "+version);
    }
}