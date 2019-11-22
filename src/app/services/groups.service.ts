import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { GroupDTO } from '../model/group.dto'

@Injectable()
export class GroupService {

     helper: JwtHelperService = new JwtHelperService();

     headers = new HttpHeaders().set('Content-Type', 'application/json')
     .set('authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWduZXIucm9kcmlndWVzQGdtYWlsLmNvbSIsImV4cCI6MTU3NDM4NjEyNn0.DB5grMgnoJZNpcQ5awp73aRCnzd_ZDG0POioE-t0gvUZeBhDXUZsY1eneFz28TJ9T2ttkinAE1vwjKu2cq4nCQ");
    

    constructor(public http: HttpClient) {
    }

    createGroup(groupDto: GroupDTO) {
        return this.http.post(
            'http://localhost:8080/api/group/', 
            groupDto,
             {
                 observe: 'response',
                 responseType: 'text'
             });
    }
    
    getGroup(groupId) {
        return this.http.get(
            `http://localhost:8080/api/group/${groupId}`, {
                 observe: 'response',
                 responseType: 'text',
                 headers: this.headers
             });
    }
    
}