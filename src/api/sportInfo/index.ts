import request from "@/utils/request";
import type { SportInfo } from "./type";
import type { ResData } from "../common/type";

enum API{
    add = '/sportInfo/add',
    del = '/sportInfo/del/',
    update = '/sportInfo/upd',
    selAll = '/sportInfo/selAll',
}

export const addSportInfo = (sportInfo:SportInfo) => {
    return request.post<SportInfo,ResData<SportInfo[]>>(API.add, sportInfo);
}

export const updateSportInfo = (sportInfo:SportInfo) => {
    return request.put<SportInfo,any>(API.update,sportInfo)
}

export const delSportInfo = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllSportInfo = () => {
    return request.get<any,ResData<SportInfo[]>>(API.selAll)
}

