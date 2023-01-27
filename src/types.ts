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
}

export type Tproduct = {
id: string,
name:string,
price:number,
description:string,
imagemUrl:string
}

export type TPurchase = {
userId: string,
productId: string,
quantity:number,
totalPrice:number
}