export enum CATEGORY{
    ACESSORIES="Acessories",
    ELETRONICS="Eletronics",
    GAME="Game"
}




export type Tuser = {
id:string,
email:string,
password:string
}

export type Tproduct = {
id: string,
name:string,
price:number,
category:CATEGORY
}

export type TPurchase = {
userId: string,
productId: string,
quantity:number,
totalPrice:number
}