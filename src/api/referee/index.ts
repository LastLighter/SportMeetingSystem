import request from "@/utils/request"
import type { Referee } from "./type"
import type { ResData } from "../common/type";

enum API{
    add = '/referee/add',
    update = '/referee',
    del = '/referee/del/',
    selAll = '/referee/selAll'
}

export const addReferee = (referee:Referee) => {
    return request.post<Referee,any>(API.add, referee);
}

export const updateReferee = (referee:Referee) => {
    return request.put<Referee,any>(API.update,referee)
}

export const delReferee = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllReferee = () => {
    return request.get<any,ResData<Referee[]>>(API.selAll)
}