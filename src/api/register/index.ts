import request from "@/utils/request";
import type { Register, RegisterDto } from "./type";
import type{ ResData } from './../common/type';
import type { PageInfo } from "./../common/type";

enum API{
    add = '/register/add',
    del = '/register/del/',
    update = '/register/upd',
    selAll = '/register/selAll',
    selKey = '/register/selkey',
}

export const addRegister = (register:Register) => {
    return request.post<Register,any>(API.add, register);
}

export const updateRegister = (register:Register) => {
    return request.put<Register,any>(API.update,register)
}

export const delRegister = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllRegister = (pageNum:number, pageSize:number) => {
    return request.get<any,ResData<PageInfo<RegisterDto>>>(API.selAll, {params:{pageNum:pageNum, pageSize:pageSize}})
}

export const selKeyRegister = (userName:string|null, sportName:string|null) => {
    return request.post<any,ResData<RegisterDto[]>>(API.selKey, {params:{user:userName, sport:sportName}});
}
