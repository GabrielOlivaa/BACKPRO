"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3004, () => {
    console.log("servidor rodando na porta 3004");
});
app.get('/ping', (req, res) => {
    res.send('pong!');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users").select("id", "email", "password", "created_at");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post(`/users`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser string.");
        }
        if (id.length < 4) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos 4 caracteres.");
        }
        if (id[0] !== "i") {
            res.status(404);
            throw new Error("'id' deve começar com a letra i.");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser string.");
        }
        if (name.length < 2) {
            res.status(400);
            throw new Error("'name' deve possuir pelo menos 2 caracteres.");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("'email' deve ser string.");
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("O 'email' deve ser do tipo 'test@email.com'.");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        const [userIdAlreadyExist] = yield (0, knex_1.db)("users").where({ id });
        if (userIdAlreadyExist) {
            res.status(400);
            throw new Error("id já existe.");
        }
        const [userEmailAlreadyExist] = yield (0, knex_1.db)("users").where({ email });
        if (userEmailAlreadyExist) {
            res.status(400);
            throw new Error("email já existe.");
        }
        const newUser = {
            id,
            name,
            email,
            password
        };
        yield (0, knex_1.db)("users").insert(newUser);
        res.status(201).send({
            message: "Cadastro realizado com sucesso",
            user: newUser
        });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get(`/products`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const result = yield (0, knex_1.db)("products").select("id", "name", "price", "description", "image_url AS imageUrl");
            res.status(200).send(result);
        }
        else {
            const resultSearchTerm = yield (0, knex_1.db)("products")
                .where("name", "LIKE", `%${searchTerm}%`)
                .orWhere("description", "LIKE", `%${searchTerm}%`);
            res.status(200).send(resultSearchTerm);
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post(`/products`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser string.");
        }
        if (id[0] !== "p") {
            res.status(404);
            throw new Error("'id' deve começar com a letra 'p'.");
        }
        if (id[1] !== "o") {
            res.status(404);
            throw new Error("'id' deve começar com a letra 'p' e depois 'o'.");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser string.");
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error("'price' deve ser number.");
        }
        if (typeof description !== "string") {
            res.status(400);
            throw new Error("'description' deve ser string.");
        }
        if (typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("'image_url' deve ser string.");
        }
        const [productIdAlreadyExist] = yield (0, knex_1.db)("products").where({ id });
        if (productIdAlreadyExist) {
            res.status(400);
            throw new Error("id já existe.");
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        };
        const productShow = {
            id,
            name,
            price,
            description,
            imageUrl
        };
        yield (0, knex_1.db)("products").insert(newProduct);
        res.status(201).send({
            message: "Produto cadastrado com sucesso",
            product: productShow
        });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.put(`/product/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToEdit = req.params.id;
        if (idToEdit[0] !== "p") {
            res.status(404);
            throw new Error("'id' deve começar com a letra 'p'.");
        }
        if (idToEdit[1] !== "o") {
            res.status(404);
            throw new Error("'id' deve começar com a letra 'p' e 'o'.");
        }
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.imageUrl;
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("'name' deve ser string.");
            }
            if (newName.length < 2) {
                res.status(400);
                throw new Error("'name' deve possuir pelo menos 2 caracteres.");
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400);
                throw new Error("'price' deve ser number.");
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("'description' deve ser string.");
            }
            if (newDescription.length < 2) {
                res.status(400);
                throw new Error("'description' deve possuir pelo menos 2 caracteres.");
            }
        }
        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400);
                throw new Error("'imageUrl' deve ser string.");
            }
        }
        const [productToEdit] = yield (0, knex_1.db)("products").where({ id: idToEdit });
        if (!productToEdit) {
            res.status(404);
            throw new Error("id não encontrado.");
        }
        const newProduct = {
            name: newName || productToEdit.name,
            price: newPrice || productToEdit.price,
            description: newDescription || productToEdit.description,
            image_url: newImageUrl || productToEdit.image_url
        };
        const productShow = {
            name: newName || productToEdit.name,
            price: newPrice || productToEdit.price,
            description: newDescription || productToEdit.description,
            imageUrl: newImageUrl || productToEdit.image_url
        };
        yield (0, knex_1.db)("products").update(newProduct).where({ id: idToEdit });
        res.status(200).send({
            message: "Produto atualizado com sucesso",
            product: productShow
        });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.get(`/purchases`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("purchases").select("id", "total_price AS totalPrice", "created_at AS createdAt", "paid", "buyer AS buyerId");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newIdPurchase = req.body.id;
        const newBuyer = req.body.buyer;
        const newProducts = req.body.products;
        const { productId, quantity } = newProducts;
        const [idExist] = yield (0, knex_1.db)("purchases").where({ id: newIdPurchase });
        if (idExist) {
            res.status(400);
            throw new Error("Id já cadastrado");
        }
        if (newIdPurchase[0] !== "p" && newIdPurchase[1] !== "u") {
            res.status(400);
            throw new Error("O id deve iniciar com 'pu'.");
        }
        if (!newIdPurchase || !newBuyer || !newProducts) {
            res.status(400);
            throw new Error("Falta adicionar id, buyer e produtos.");
        }
        if (typeof newIdPurchase !== "string" &&
            typeof newBuyer !== "string") {
            res.status(400);
            throw new Error("'userId' e 'productId' são string.");
        }
        let newPriceTotal = 0;
        const bodyPurchase = {
            id: newIdPurchase,
            buyer: newBuyer,
            total_price: newPriceTotal
        };
        yield (0, knex_1.db)("purchases").insert(bodyPurchase);
        const products = [];
        for (let item of newProducts) {
            const [addItem] = yield (0, knex_1.db)("products").where({ id: item.id });
            newPriceTotal += addItem.price * item.quantity;
            yield (0, knex_1.db)("purchases_products").insert({ purchase_id: newIdPurchase, product_id: item.id, quantity: item.quantity });
            const completeProduct = Object.assign(Object.assign({}, addItem), { quantity });
            products.push(completeProduct);
        }
        yield (0, knex_1.db)("purchases").update({ total_price: newPriceTotal }).where({ id: newIdPurchase });
        const result = {
            id: bodyPurchase.id,
            buyer: bodyPurchase.buyer,
            totalPrice: newPriceTotal,
            products
        };
        res.status(201).send({
            message: "Pedido realizado com sucesso",
            purchase: result
        });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [purchase] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (purchase) {
            const [purchaseWithUser] = yield (0, knex_1.db)("purchases")
                .select("purchases.id AS purchaseID", "purchases.total_price AS totalPrice", "purchases.created_at AS createdAt", "purchases.paid", "users.id AS buyerID", "users.email", "users.name")
                .innerJoin("users", "purchases.buyer", "=", "users.id")
                .where({ "purchases.id": id });
            const productFromPurchase = yield (0, knex_1.db)("purchases_products")
                .select("purchases_products.product_id AS id", "products.name", "products.price", "products.description", "products.image_URL AS imageUrl", "purchases_products.quantity")
                .innerJoin("products", "products.id", "=", "purchases_products.product_id")
                .where({ purchase_id: id });
            const result = Object.assign(Object.assign({}, purchaseWithUser), { productsList: productFromPurchase });
            res.status(200).send(result);
        }
        else {
            res.status(404);
            throw new Error("Compra não encontrada");
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send({ message: error.message });
        }
        else {
            res.send({ message: "Erro inesperado" });
        }
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        if (idToDelete[0] !== "p") {
            res.status(404);
            throw new Error("'id' deve começar com a letra p.");
        }
        const [purchaseIdToDelete] = yield (0, knex_1.db)("purchases").where({ id: idToDelete });
        if (!purchaseIdToDelete) {
            res.status(404);
            throw new Error("'id' não encontrado.");
        }
        yield (0, knex_1.db)("purchases_products").del().where({ purchase_id: idToDelete });
        yield (0, knex_1.db)("purchases").del().where({ id: idToDelete });
        res.status(200).send({ message: "Pedido cancelado com sucesso" });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map