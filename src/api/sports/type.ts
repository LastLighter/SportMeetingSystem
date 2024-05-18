export interface Sport{
    id: string,
    name: string,
    number: number,
    type: string,
    time: string,
    place: string,
    refereeId: string,
    endTime: string,
}

export interface SportDto{
    id: string,
    name: string,
    number: number,
    type: string,
    time: string,
    place: string,
    referee: string,
    endTime: string,
}