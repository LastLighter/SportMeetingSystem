import request from "@/utils/request";
import type { User, UserDto } from "./type";
import type { PageInfo, ResData } from "../common/type";

enum API{
    add = '/user/add',
    del = '/user/del/',
    update = '/user/upd',
    selAll = '/user/selAll',
    selKey = '/user/selKey',
}

export const addUser = (user:User) => {
    return request.post<User,ResData<User[]>>(API.add, user);
}

export const updateUser = (user:User) => {
    return request.put<User,any>(API.update,user)
}

export const delUser = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllUser = (pageNum:number, pageSize:number) => {
    return request.get<any,ResData<PageInfo<UserDto>>>(API.selAll, {params:{pageNum:pageNum, pageSize:pageSize}})
}

export const selKeyUser = (name:string|null, username:string|null, college:string|null) => {
    return request.get<any,ResData<UserDto[]>>(API.selKey, {params:{name:name, username:username, college:college}})
}

