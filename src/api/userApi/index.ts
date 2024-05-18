import userRequest from "@/utils/userRequest"
import type { ResData } from "../common/type"
import type { LoginData } from "../manage/type"
import type { User, UserDto } from "../user/type"
import type { RegisterDto } from "../register/type"
import type { ScoreDto } from "../score/type"
import type { SportDto } from "../sports/type"
import type { HistoryDto } from "../history/type"

enum API{
    login = '/user/login',
    logon = '/user/logon',
    register = '/user/register',
    upload = '/user/upload,',
    pushData = '/user/push',
    selReg = '/user/selReg',
    delReg = '/user/delReg',
    selScore = '/user/selScore',
    selSport = '/user/selSport',
    upd = '/user/upd',
    history = '/user/history',
    push = '/user/push',
    selNow = '/user/selNow',
    selScBySport = '/user/selScBySport',
    selUserKeySport = '/user/selSpKey',
    updPush = '/user/updPush',
}

export const userLogin = (username:string, password:string) => {
    return userRequest.post<any,ResData<LoginData>>(API.login,null,{params:{username:username, password:password}})
}

export const userLogon = (user:User) => {
    return userRequest.post<any,any>(API.logon,user)
}

export const uploadUserAvatar = (file:File) => {
    const formData = new FormData()
    formData.append('file',file)
    return userRequest.post<any,ResData<string>>(API.upload, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params:{
            module:'avatar'
        }
    })
}

export const userUpd = (user:User) => {
    return userRequest.put<any,ResData<UserDto>>(API.upd,user)
}

export const userRegister = (sportId:string) => {
    return userRequest.put<any,ResData<string>>(API.register,null,{params:{sportId:sportId}})
}

export const selUserScore = (id:string) => {
    return userRequest.get<string,ResData<ScoreDto>>(API.selScore,{params:{id:id}})
}

export const selUserReg = (id:string) => {
    return userRequest.get<string,ResData<RegisterDto[]>>(API.selReg,{params:{id:id}})
}

export const delUserReg = (id:string) => {
    return userRequest.delete<string,any>(API.delReg,{params:{id:id}})
}

export const selUserSport = () => {
    return userRequest.get<string,ResData<SportDto[]>>(API.selSport)
}

export const selUserHistory = () => {
    return userRequest.get<string,ResData<HistoryDto[]>>(API.history)
}

export const cancelUserRegister = (registerId:string) => {
    return userRequest.delete<any,ResData<string>>(API.register,{params:{id:registerId}})
}

export const selScBySport = (sportName:string) => {
    return userRequest.get<string,ResData<ScoreDto[]>>(API.selScBySport, {params:{sport:sportName}})
}

export const selUserPush = (id:string) => {
    return userRequest.get<string,ResData<RegisterDto[]>>(API.push, {params:{id:id}})
}

export const selNow = () => {
    return userRequest.get<string,ResData<SportDto[]>>(API.selNow)
}

export const selUserKeySport = (key:string) => {
    return userRequest.get<string,ResData<SportDto[]>>(API.selUserKeySport,{params:{key:key}})
}

export const updUserPush = (id:string) => {
    return userRequest.put<string,ResData<any>>(API.updPush,null,{params:{id:id}})
}
