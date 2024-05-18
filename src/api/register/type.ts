export interface Register{
    id:string,
    userId:string,
    sportId:string,
    push:string|null,//是否推送过
    groups:string|null,//分组
    track:string|null,//赛道
    status:string,//出复赛
    review:string,//审核
    brand:string|null,//标记，不能添加
}

export interface RegisterDto{
    id:string,
    user:string,
    sport:string,
    push:string|null,//是否推送过
    groups:string|null,//分组
    track:string|null,//赛道
    status:string,//出复赛
    review:string,//审核
    brand:string|null,//标记，不能添加
}