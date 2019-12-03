import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user.dto';

@Injectable()
export class UserService {



    constructor(
        public http: HttpClient) {
    }


    getUserByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/user/findMail?email=${email}`)
    }


    getAllUsers(): Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}/user/`)
    }

    signUp(userDTO: UserDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/user`, userDTO)
    }
}