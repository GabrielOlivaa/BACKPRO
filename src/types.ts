export enum CATEGORY{
    ACESSORIES="Acessories",
    ELETRONICS="Eletronics",
    GAME="Game"
}




export type Tuser = {
id:string,
email:string,
password:string,
name:string
created_at: string
}

export type Tproduct = {
id: string,
name:string,
price:number,
description:string,
image_url: string
}

export type TPurchase = {
id: string,
totalPrice: number,
created_at: string,
paid: number,
buyer: string
}