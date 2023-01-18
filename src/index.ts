import { user,product,purchase, createProduct,getAllProducts,getProductsById,createPurchase,getAllPurchase,productByName, getAllUser, createUser } from "./database";
import { CATEGORY } from "./types";
import cors from 'cors';
import { Tuser, Tproduct, TPurchase } from "./types";
import express, {Request,  Response} from "express"


const app = express()
app.use(express.json())
app.use(cors())

app.listen(3005, ()=>{
    console.log("servidor rodando na porta 3005");
    
})

app.get('/ping', (req:Request, res:Response)=>{
    res.send('pong!')
})

//  USER 

app.get('/user', (req:Request, res:Response)=>{
    
        res.status(200).send(getAllUser())

  
    
})

// PRODUCT
app.get('/product', (req:Request, res:Response)=>{
   
        res.status(200).send(getAllProducts())

    
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


    createUser(id, email, password)
    res.status(201).send("Novo usuario registrado com sucesso")
    
})

// product 

app.post('/product', (req:Request, res:Response)=>{
    
        const {id, name, price,category} = req.body as Tproduct
        
        createProduct(id, name, price,category)
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

// product id

app.get('/product/:id', (req:Request, res:Response)=>{
    
        const id = req.params.id
        
        res.status(200).send(getProductsById(id))
    
    
})

//  purchase id

app.get('/user/:id/purchase', (req:Request, res:Response)=>{
    
        const id = req.params.id
       
        res.status(200).send(getAllPurchase(id))

    
})

// delete user

app.delete('/user/:id',(req:Request, res:Response)=>{
    
        const id = req.params.id
        
        
            const userIndex = user.findIndex((user) => user.id === id )
            if (userIndex >= 0 ){
               user.splice(userIndex,1)
            }
            res.status(200).send("usuario delatado com sucesso")
    })

// delete product 

app.delete('/product/:id', (req:Request, res:Response)=>{
   
        const id = req.params.id
       
        const productIndex = product.findIndex((product1)=> product1.id ===id)
        
        
            if(productIndex >=0){
                product.splice(productIndex,1)
            }



    res.status(200).send("produto deletado com sucesso")
})

//  editar usuario 

app.put('/user/:id', (req:Request, res:Response)=>{

    
        const id = req.params.id
      
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user1 = user.find((user1) => user1.id ===id)

   
        if (user1){
            user1.email = newEmail ||user1.email
            user1.password = newPassword || user1.password
            res.status(200).send("cadastro realizado com sucesso")
        }
  
    
} )

//  product id

app.put(' /product/:id', (req:Request, res:Response)=>{


        const id = req.params.id

       

        const newName = req.body.name as string| undefined
        const newPrice = req.body.price as string |undefined
        const newCategory = req.body.category as CATEGORY | undefined
    

        
        const product1 = product.find((product1)=> product1.id===id)
        if(product1){
            product1.name= newName || product1.name   
            product1.price 
            product1.category= newCategory ||product1.category
        }
        res.status(200).send("produto atualizado com sucesso")

  
})