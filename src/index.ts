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
    try{
        res.status(200).send(getAllUser())

    }catch(error:any){
        console.log(error);

        if(res.statusCode===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
})

// PRODUCT
app.get('/product', (req:Request, res:Response)=>{
    try{
        res.status(200).send(getAllProducts())

    }catch(error:any){
        console.log(error);

        if(res.statusCode===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
})
// product search

app.get('/product/search', (req:Request, res:Response)=>{
    try{
        const q = req.query.q as string
        if(q.length<=0){
            res.status(400)
            throw new Error("A busca deve possuir um caracter");
            
        }
        const result = product.filter((product1)=>{
            return product1.name.toLowerCase().includes(q.toLowerCase())

        })
        res.status(200).send(result)
    } catch(error:any){
        console.log(error);
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }

})

//  user 

app.post( '/user', (req:Request, res:Response)=>{
    try{
    const {id, email, password} = req.body as Tuser

    if(!id){
        res.status(404)
        throw new Error("Coloque um id valido para criar a conta");
    }
    if (!email){
        res.status(404)
        throw new Error("Coloque um email valido para criar a conta");
    }
    if (!password){
        res.status(404)
        throw new Error("Coloque uma senha valida para criar a conta");
        
    }
    if(user.find((user1)=>user1.id ===id)){
        res.status(404)
        throw new Error("ID ja existente. Insira um id valido");
        
    }
    if(user.find((user1)=>user1.email === email)){
        res.status(404)
        throw new Error("Email ja existente. Insira um email valido");
        

    }

    createUser(id, email, password)
    res.status(201).send("Novo usuario registrado com sucesso")
    }catch(error:any){
        console.log(error);
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.menssage)
    }
})

// product 

app.post('/product', (req:Request, res:Response)=>{
    try{
        const {id, name, price,category} = req.body as Tproduct
        if(!id){
            res.status(404)
            throw new Error("coloque um id para crair um produto");          
        }
        if(!name){
            res.status(404)
            throw new Error("coloque um nome para crair um produto");
        }
        if(!price){
            res.status(404)
            throw new Error("coloque um preço para criar um preço");
        }
        if(!category){
            res.status(404)
            throw new Error("coloque uma categoria valida para criar um produto");
        }
        
        createProduct(id, name, price,category)
        res.status(201).send("Produto registrado com sucesso")

    }catch(error:any){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
})
//      purchase 

app.get('/purchase', (req:Request, res:Response)=>{
    try{
        const {userId,productId,quantity,totalPrice}= req.body as TPurchase
        if(!userId){
            res.status(404)
            throw new Error("Coloque um userId para criar uma compra");
        }
        if(!productId){
            res.status(404)
            throw new Error("Coloque um productId para criar uma compra");
        }
        if(!quantity){
            res.status(404)
            throw new Error("Coloque uma quantidade para criar um produto");
        }
        if(!totalPrice){

            res.status(404)
            throw new Error("Coloque um preço para crair um produto");
            
        }
        if(!(user.find((user1)=>user1.id ===userId))){
            res.status(404)
            throw new Error("Usuario não existe");
            
        }
        if(!(product.find((product1)=>product1.id === productId))){
            res.status(404)
            throw new Error("O produto não existe");
            
        }

        const newPurchase ={  
            userId,productId,quantity,totalPrice }
            purchase.push(newPurchase)
            res.status(201).send("Compra realizada com sucesso")
    }catch(error:any){
        console.log(error)
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.mensagem)
        
    }
})

// product id

app.get('/product/:id', (req:Request, res:Response)=>{
    try{
        const id = req.params.id
        if(!(product.find((product1)=>product1.id ===id))){
            res.status(404)
            throw new Error("O id do produto não existe");
            
        }
        res.status(200).send(getProductsById(id))
    }catch(error:any){console.log(error);
        if(res.statusCode===200){
            res.status(500)
        }
    res.send(error.mensagem)

    }
})

//  purchase id

app.get('/user/:id/purchase', (req:Request, res:Response)=>{
    try{
        const id = req.params.id
        if(!(user.find((user1)=>user1.id === id))){
            res.status(404)
            throw new Error("O id de usuario não existe");
            
        }
        res.status(200).send(getAllPurchase(id))

    }catch(error:any){
        console.log(error);
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
})

// delete user

app.delete('/user/:id',(req:Request, res:Response)=>{
    try{
        const id = req.params.id
        if(!(user.find((user1)=>user1.id ===id))){
            res.status(404)
            throw new Error("O id do usuario não existe");
        }
        
            const userIndex = user.findIndex((user) => user.id === id )
            if (userIndex >= 0 ){
               user.splice(userIndex,1)
            }
            res.status(200).send("usuario delatado com sucesso")
    }catch(error:any){
        console.log(error);
        if(res.statusCode===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
})

// delete product 

app.delete('/product/:id', (req:Request, res:Response)=>{
    try{
        const id = req.params.id
        if(!(product.find((product1)=>product1.id ===id))){
            res.status(404)
            throw new Error("O id do produto não existe");
            
        }
        const productIndex = product.findIndex((product1)=> product1.id ===id)
        if(res.statusCode===200){
            res.status(500)
        }        
        
            if(productIndex >=0){
                product.splice(productIndex,1)
            }

    }catch(error:any){
        console.log(error);
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }

    res.status(200).send("produto deletado com sucesso")
})

//  editar usuario 

app.put('/user/:id', (req:Request, res:Response)=>{

    try{
        const id = req.params.id
        if(!(product.find((product1)=> product1.id === id))){
            res.status(404)
            throw new Error("O id do produto não existe ");
        }
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user1 = user.find((user1) => user1.id ===id)

        if(!newEmail){
            res.status(404)
            throw new Error("O email não existe");    
        }
        if(!newPassword){
            res.status(404)
            throw new Error("A senha não existe");
            
        }
        if (user1){
            user1.email = newEmail ||user1.email
            user1.password = newPassword || user1.password
            res.status(200).send("cadastro realizado com sucesso")
        }
    }catch(error:any){
        console.log(error);
        if(res.statusCode ===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }
} )

//  product id

app.put(' /product/:id', (req:Request, res:Response)=>{

    try{
        const id = req.params.id

        if (!(product.find((product1 => product1.id === id)))){
            res.status(404)
            throw new Error("O id do produto não existe");
        }

        const newName = req.body.name as string| undefined
        const newPrice = req.body.price as string |undefined
        const newCategory = req.body.category as CATEGORY | undefined
    

        if (!newName){
            res.status(404)
            throw new Error("Escreva um novo nome");
            
        }
        if (!newPrice){
            res.status(404)
            throw new Error("Escreva um novo preço");
            
        }
        if(!newCategory){
            res.status(404)
            throw new Error("Escrava uma categoria");
            
        }
        const product1 = product.find((product1)=> product1.id===id)
        if(product1){
            product1.name= newName || product1.name   
            product1.category= newCategory ||product1.category
        }
        res.status(200).send("produto atualizado com sucesso")

    }catch(error:any){
        console.log(error);
        if(res.statusCode===200){
            res.status(500)
        }
        res.send(error.mensagem)
    }    
})