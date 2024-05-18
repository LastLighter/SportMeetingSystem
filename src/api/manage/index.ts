import request from "@/utils/request";
import type { LoginData, Manage } from "./type";
import type{ ResData } from './../common/type';

enum API{
    add = '/manage/add',
    del = '/manage/del/',
    update = '/manage/upd',
    selAll = '/manage/selAll',
    login = '/manage/login',
    upload = '/manage/upload',
}

export const addManage = (manage:Manage) => {
    return request.post<Manage,any>(API.add, manage);
}

export const updateManage = (manage:Manage) => {
    return request.put<Manage,any>(API.update,manage)
}

export const delManage = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllManage = () => {
    return request.get<any,ResData<Manage[]>>(API.selAll)
}

export const manageLogin = (username:string, password:string) => {
    return request.post<any,ResData<LoginData>>(API.login, {username:username, password:password});
}

export const uploadManageAvatar = (file:File) => {
    const formData = new FormData()
    formData.append('file',file)
    return request.post<any,ResData<string>>(API.upload, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params:{
            module:'avatar'
        }
    })
}
