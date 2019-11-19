import { Backend } from "./Backend";
import { Injectable } from "@angular/core";

@Injectable()
export class FakeBackend {

    backend = {
        
            "environment": "PROD",
            "baseUrl": "https://jsonplaceholder.typicode.com",
            "api": [
                {
                    "name": "get1",
                    "method": "GET",
                    "url": "/posts" 
                },
                {
                    "name": "get2",
                    "method": "GET",
                    "url": "/posts/1/comments" 
                },
                {
                    "name": "post",
                    "method": "POST",
                    "url": "/posts" 
                },
                
            ]
        
    }

    public getApis(): Backend {

        return this.backend as Backend;
    }

}