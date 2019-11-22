import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GroupDTO } from '../model/group.dto'
import { SpendDTO } from '../model/spend.dto';
import { API_CONFIG } from '../config/api.config';


@Injectable()
export class GroupService {



    constructor(public http: HttpClient) {
    }

    createGroup(groupDto: GroupDTO) {
        return this.http.post(
            'http://localhost:8080/api/group/', groupDto);
    }

    addUser(groupId, userId) {
        return this.http.put(
            `http://localhost:8080/api/group/${groupId}/user/${userId}`, {});
    }

    addSpend(groupId,spendDTO: SpendDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/group/${groupId}/spend`, spendDTO)
    }



    getGroup(groupId) {
        return this.http.get(
            `http://localhost:8080/api/group/${groupId}`);
    }

}