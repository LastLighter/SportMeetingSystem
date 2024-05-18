import request from "@/utils/request";
import type { College } from "./type";
import type{ ResData } from './../common/type';

enum API{
    add = '/college/add',
    check = 'college/check',
    del = '/college/del/',
    update = '/college/upd',
    selAll = '/college/selAll'
}

export const addCollege = (college:College) => {
    return request.post<College,any>(API.add, college);
}

export const updateCollege = (college:College) => {
    return request.put<College,any>(API.update,college)
}

export const delCollege = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllCollege = () => {
    return request.get<any,ResData<College[]>>(API.selAll)
}