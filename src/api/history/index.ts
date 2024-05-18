import request from "@/utils/request"
import type { History, HistoryDto } from "./type"
import type { ResData } from "../common/type"

enum API{
    selAll = '/history/selAll',
    selSport = '/history/selSport',
    update = '/history/upd',
    del = '/history/del/'
}

export const selAllHistory= () => {
    return request.get<any,ResData<HistoryDto[]>>(API.selAll)
}

export const selKeyHistory = (key:string) => {
    return request.get<any,ResData<HistoryDto[]>>(API.selSport, {params:{key:key}})
}

export const updateHistory = (history:History) => {
    return request.put<History,any>(API.update,history)
}

export const delHistory = (id:string) => {
    return request.delete<string,any>(API.del + id)
}