export interface Menu {
    menuIcon: string,  
    menuName: string,
    menuId?:string,
    menuRoute?: string
}

export interface EleOptions{
    value:string,
    label:string
}

export interface PageItem{
    name:string,
    page:number
}

export interface DropDownItem{
    name:string,
    iconPath:string,
    handler:() => void
}