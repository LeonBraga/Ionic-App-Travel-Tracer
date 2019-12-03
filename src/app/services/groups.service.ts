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
            `${API_CONFIG.baseUrl}/group/`, groupDto);
    }

    addUser(groupId, userId) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/group/${groupId}/user/${userId}`, {});
    }

    addSpend(groupId,spendDTO: SpendDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/group/${groupId}/spend`, spendDTO)
    }



    getGroup(groupId) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/group/${groupId}`);
    }

}