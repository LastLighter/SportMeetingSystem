import request from "@/utils/request";
import type { Score, ScoreDto } from "./type";
import type{ PageInfo, ResData } from './../common/type';

enum API{
    add = '/scores/add',
    del = '/scores/del/',
    update = '/scores/upd',
    selAll = '/scores/selAll',
    selKey = '/scores/selKey',
}

export const addScore = (score:Score) => {
    return request.post<Score,any>(API.add, score);
}

export const updateScore = (score:Score) => {
    return request.put<Score,any>(API.update,score)
}

export const delScore = (id:string) => {
    return request.delete<string,any>(API.del + id)
}

export const selAllScore = (pageNum:number, pageSize:number) => {
    return request.get<any,ResData<PageInfo<ScoreDto>>>(API.selAll, {params:{pageNum:pageNum, pageSize:pageSize}})
}

export const selKeyScore = (userName:string|null, sportName:string|null) => {
    return request.get<any,ResData<ScoreDto[]>>(API.selKey, {params:{user:userName, sport:sportName}});
}
