export interface ResData<T>{
    code: string,
    data: T,
    message: string
}

export interface PageInfo<T>{
    total:number,
    list:T[]
}