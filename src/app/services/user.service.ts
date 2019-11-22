import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class UserService {

    headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWduZXIucm9kcmlndWVzQGdtYWlsLmNvbSIsImV4cCI6MTU3NDM4NjEyNn0.DB5grMgnoJZNpcQ5awp73aRCnzd_ZDG0POioE-t0gvUZeBhDXUZsY1eneFz28TJ9T2ttkinAE1vwjKu2cq4nCQ");
   

    constructor(
        public http: HttpClient) {
    }
    

    getUserByEmail(email: string) {
        return this.http.get(`http://localhost:8080/api/user/findMail?email=${email}`, {
            headers: this.headers
        })
    }
}