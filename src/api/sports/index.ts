import request from "@/utils/request";
import type { Sport,SportDto } from "./type";
import type{ ResData } from './../common/type';


enum API {
    getAll = '/sports/selAll',
    del = '/sports/del/',
    add = '/sports/add',
    selKey = '/sports/selKey',
    upd = '/sports/upd'
}

export const getAllSports = ():Promise<ResData<SportDto[]>> => {
    return request.get<any,ResData<SportDto[]>>(API.getAll)
}

export const delSport = (id:string) => {
    return request.delete<any,ResData<any>>(API.del + '/' + id)
}

export const addSport = (sport:Sport) => {
    return request.post<Sport,any>(API.add,sport)
}

export const updateSport = (sport:Sport) => {
    return request.put<Sport,any>(API.upd,sport)
}

export const selKeySport = (name:string|null, type:string|null, place:string|null) => {
    return request.get<any,ResData<SportDto[]>>(API.selKey, {params:{name:name, type:type, place:place}})
}