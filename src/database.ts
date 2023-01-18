
// import {Tuser, Tproduct, TPurchase, CATEGORY} from './types';
import {Tuser, Tproduct, TPurchase, CATEGORY} from "./types"
export const user: Tuser [] = [
    {
        id:"12345",
        email:"ricardo@gmail.com",
        password:"rick2214"
    },
    {
        id:"54321",
        email:"pedro@gmail.com",
        password:"pedro1422"
    }
]

export const product: Tproduct [] = [
    {
        id:"001",
        name:"Tv",
        price:1200,
        category:CATEGORY.ELETRONICS
    },
    {
        id:"002",
        name:"X-box",
        price:2000,
        category:CATEGORY.GAME
    }
]

export const purchase: TPurchase[] =[
    {
        userId:"12345",
        productId:"002",
        quantity:1,
        totalPrice:2000
    },
    {
        userId:"54321",
        productId:"001",
        quantity:2,
        totalPrice:2400
    }
]
//                      USER

export const createUser = (id:string, email:string, password:string) =>{
    const newUser:Tuser = {
        id,
        email,
        password
       }
       user.push(newUser)
       console.log("cadastro realizado com sucesso");
       
}

export const getAllUser = ():void => {
    console.table(user)
}

// ------------------

//                   PRODUCT 

export const createProduct  =(id:string , name:string , price:number , category:CATEGORY)=>{
    const newProduct: Tproduct = {
        id,
        name,
        price,
        category
    }
    product.push(newProduct)
    console.log("produto criado com sucesso");
    
}

export const getAllProducts = ():void =>{
    console.table(product)
}

export const getProductsById = (idToSearch:string) : Tproduct[]=> {
    return product.filter(
        (product1) => {
          return(product1.id === idToSearch)
        }
      )  
}

export const productByName = (q:string) :void =>{
    const query = product.filter((product1)=>{
        return(product1.name.toLowerCase().includes(q.toLowerCase()))
    })
    console.log(query);
    
}

// -----------------

//                   PURCHASE

export const createPurchase = (userId:string , productId:string , quantity:number  ,totalPrice:number,)=>{
    const newPurchase:TPurchase ={
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)

    console.log("compra realizada com sucesso");

    console.table(purchase)
    
}

export const getAllPurchase = (userIdToSearch:string)  :TPurchase[]=> {
    return purchase.filter(
        (purchase1) => {
          return(purchase1.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
      ) 
}