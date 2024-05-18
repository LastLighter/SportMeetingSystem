export interface Manage{
    id:string,
    name:string,
    sex:string,
    phone:string,
    username:string,
    password:string|null,
    avatar:string,
}

export interface LoginData{
    id:string,
    name:string,
    sex:string,
    phone:string,
    username:string,
    token:string,
    college?:string,
    avatar:string,
}