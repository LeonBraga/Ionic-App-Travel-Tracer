import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class UserService {

    headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWduZXIucm9kcmlndWVzQGdtYWlsLmNvbSIsImV4cCI6MTU3NDM5MzM2Mn0.RbojgxiIgY_l4SlorEQplclzgfyGaSRNUwKTfSw3jgHDUqgH3wnLj1NDrixbYHeJe62QfVMhDKa_hE1APNR2kw");
   

    constructor(
        public http: HttpClient) {
    }
    

    getUserByEmail(email: string) {
        return this.http.get(`http://localhost:8080/api/user/findMail?email=${email}`, {
            headers: this.headers
        })
    }
}