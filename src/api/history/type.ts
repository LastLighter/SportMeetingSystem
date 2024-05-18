export interface HistoryDto{
    id:string,
    user:string,
    sport:string,
    grade:string,
    createTime:string,
}

export interface History{
    id:string,
    userId:string|null,
    sportId:string|null,
    grade:string,
    createTime:string|null,
}