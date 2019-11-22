import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../model/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../model/localuser";
import { User } from "../model/user";
import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {

     helper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient, 
        public storage: StorageService) {
    }

    authenticate(creds : CredentialsDTO) {
        console.log(creds)
        return this.http.post(
           'http://localhost:8080/login', 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        console.log("Salvou usuario")
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.helper.decodeToken(tok).sub
        };
        console.log(user)
        this.storage.setLocalUser(user);
    }

    saveUserLoggedProfile(userFromService: User) {
        let user: User = {
            id: userFromService.id,
            name: userFromService.name,
            email: userFromService.email
        }

        this.storage.setLoggedUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}