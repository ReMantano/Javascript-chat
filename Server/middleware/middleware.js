/**
 * Intermediate processing class
 */
module.exports = class Middleware{

    /**
     * 
     * @param {Database} db  
     */
    constructor(db){
        this._db = db;
    }
    

    /**
     * @returns {Database} 
     */
    getDatabase(){
        return this._db;
    }
}