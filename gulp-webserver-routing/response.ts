import * as http from "http";

class Response {
    
    /**
     *
     */
    constructor() {
        this.__proto__ = http.ServerResponse.prototype;
        
    }
    
}
export = Response;