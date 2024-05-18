export interface Score{
    id:string,
    userId:string,
    sportId:string,
    grade:string,
    bonus:string,
    ranking:string,
    status:string,
}

export interface ScoreDto{
    id:string,
    user:string,
    sport:string,
    grade:string,//（时间）成绩
    bonus:string,
    ranking:string,
    status:string,
}