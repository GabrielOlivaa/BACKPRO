
// import {Tuser, Tproduct, TPurchase, CATEGORY} from './types';
import {Tuser, Tproduct, TPurchase, CATEGORY} from "./types"
export const user: Tuser [] = [
    {
        id:"12345",
        email:"ricardo@gmail.com",
        password:"rick2214",
        name:"ricardo"
    },
    {
        id:"54321",
        email:"pedro@gmail.com",
        password:"pedro1422",
        name:"pedro"
    }
]

export const product: Tproduct [] = [
    {
        id:"001",
        name:"Tv",
        price:1200,
        description:"SmartTv",
        imagemUrl:"http://"
    },
    {
        id:"002",
        name:"X-box",
        price:2000,
        description:"ultima serie",
        imagemUrl:"http://"
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

export const createUser = (id:string, email:string, password:string,name:string)  =>{
    const newUser:Tuser = {
        id,
        email,
        password,
        name
       }
       user.push(newUser)
       console.log("cadastro realizado com sucesso");
       
}

export const getAllUser = () => {
    return user
}

// ------------------

//                   PRODUCT 

export const createProduct  =(id:string , name:string , price:number ,description:string, imagemUrl:string )=>{
    const newProduct: Tproduct = {
        id,
        name,
        price,
        description,
        imagemUrl
    }
    product.push(newProduct)
    console.log("produto criado com sucesso");
    
}

export const getAllProducts = () =>{
    return product
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