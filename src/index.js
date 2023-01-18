import { user,product,purchase, createProduct,getAllProducts,getProductsById,createPurchase,getAllPurchase,productByName } from "./database";
import { CATEGORY } from "./types";


createProduct("003", "Monitor HD", 800, CATEGORY.ELETRONICS)
getAllProducts()

getProductsById("003");

productByName("Monitor")

console.table(purchase);

createPurchase("6789", "001",1,2000)

console.table(getAllPurchase("12345"))