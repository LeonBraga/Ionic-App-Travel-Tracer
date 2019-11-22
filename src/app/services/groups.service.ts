import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { GroupDTO } from '../model/group.dto'
import { Group } from '../model/group';

@Injectable()
export class GroupService {

     helper: JwtHelperService = new JwtHelperService();

     headers = new HttpHeaders().set('Content-Type', 'application/json')
     .set('authorization', 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YWduZXIucm9kcmlndWVzQGdtYWlsLmNvbSIsImV4cCI6MTU3NDM5MzM2Mn0.RbojgxiIgY_l4SlorEQplclzgfyGaSRNUwKTfSw3jgHDUqgH3wnLj1NDrixbYHeJe62QfVMhDKa_hE1APNR2kw");
    

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
                 headers: this.headers
             });
    }
    
}