
/**
 * Class for searching files in current folder
 */
module.exports = class FileReader{

    constructor(globalDir){
        this._fs = require('fs');
        this._global = globalDir;
    }

    /**
     * @param {string} path 
     * @returns {Promise} Promise object represents  files
     */
    readDir(path) {
        let context = this;
        let promise = new Promise(function (resolve, reject) {
            try {
                let data = {
                    html: "",
                    css: "",
                    script: ""
                };
                context._dirReader.call(context, path, data);
                resolve(data);
            } catch (error) {
                console.log(error);
                reject(new Error(error));
            }
        })
    
        return promise;
    }
    
    /**
     * 
     * @param {string} path 
     * @param {array} data - Output data
     */
    _dirReader(path, data) {
        let dirs = this._fs.readdirSync(this._global + path);
        let context = this;
        
        dirs.forEach(function (file) {
            if (file.includes(".")) {
                let index = path.includes("script") ? "script" : path.includes("html") ? "html" : "css";
                data[index] += context._fileReader(path + "/" + file);
    
    
            } else{
                context._dirReader.call(context, path + "/" + file, data);
            }
                
        })
    }
    
    _fileReader(path) {
        return this._fs.readFileSync(this._global + path);
    }
}