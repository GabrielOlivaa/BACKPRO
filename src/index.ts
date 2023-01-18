import { user,product,purchase, createProduct,getAllProducts,getProductsById,createPurchase,getAllPurchase,productByName, getAllUser, createUser } from "./database";
import { CATEGORY } from "./types";
import cors from 'cors';
import { Tuser, Tproduct, TPurchase } from "./types";
import express, {Request,  Response} from "express"


const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("servidor rodando na porta 3003");
    
})

app.get('/ping', (req:Request, res:Response)=>{
    res.send('pong!')
})

//  USER 

app.get('/user', (req:Request, res:Response)=>{
    
        res.status(200).send(user)

    
})

// PRODUCT
app.get('/product', (req:Request, res:Response)=>{
    
        res.status(200).send(product)

})
// product search

app.get('/product/search', (req:Request, res:Response)=>{
    
        const q = req.query.q as string
        
        const result = product.filter((product1)=>{
            return product1.name.toLowerCase().includes(q.toLowerCase())

        })
        res.status(200).send(result)

    

})

//  user 

app.post( '/user', (req:Request, res:Response)=>{
    
    const {id, email, password} = req.body as Tuser

    const newUser ={
        id,
        email,
        password
    }
    user.push(newUser)
   
    res.status(201).send("Novo usuário registrado com sucesso!")
})

// product 

app.post('/product', (req:Request, res:Response)=>{
    
        const {id, name, price,category} = req.body as Tproduct

        const newProduct = {
            id,name,price,category
        }
       
        
        product.push(newProduct)
        res.status(201).send("Produto registrado com sucesso")

    
})
//      purchase 

app.get('/purchase', (req:Request, res:Response)=>{
    
        const {userId,productId,quantity,totalPrice}= req.body as TPurchase
        
        const newPurchase ={  
            userId,productId,quantity,totalPrice }
            purchase.push(newPurchase)
            res.status(201).send("Compra realizada com sucesso")
    
})
