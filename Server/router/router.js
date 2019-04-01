var express = require("express");

/**
 * Basic router class
 */
module.exports = class Router{
    constructor(){
        this._router = express.Router();
    }


    /**
     * @returns {Router} - returns express router
     */
    getRouter(){
        return this._router;
        
    }
}