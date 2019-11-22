import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_key.config";
import { LocalUser } from "../model/localuser";
import { User } from "../model/user";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }


    getLoggedUser(): User {
        let usr = localStorage.getItem(STORAGE_KEYS.loggedUser);
        if (usr == null) {
            console.log(usr)
            return null;
        }
        else {
            console.log(usr)
            return JSON.parse(usr);
        }
    }


    setLoggedUser(user: User) {
        if (user  == null) {
            console.log(user)
            localStorage.removeItem(STORAGE_KEYS.loggedUser);
        }
        else {
            console.log(user)
            localStorage.setItem(STORAGE_KEYS.loggedUser, JSON.stringify(user));
        }
    }
}