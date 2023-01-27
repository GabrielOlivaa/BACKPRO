"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3004, () => {
    console.log("servidor rodando na porta 3004");
});
app.get('/ping', (req, res) => {
    res.send('pong!');
});
app.get('/user', (req, res) => {
    try {
        res.status(200).send((0, database_1.getAllUser)());
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.get('/product', (req, res) => {
    try {
        res.status(200).send((0, database_1.getAllProducts)());
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.get('/product/search', (req, res) => {
    try {
        const q = req.query.q;
        if (q.length <= 0) {
            res.status(400);
            throw new Error("A busca deve possuir um caracter");
        }
        const result = database_1.product.filter((product1) => {
            return product1.name.toLowerCase().includes(q.toLowerCase());
        });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.post('/user', (req, res) => {
    try {
        const { id, email, password } = req.body;
        if (!id) {
            res.status(404);
            throw new Error("Coloque um id valido para criar a conta");
        }
        if (!email) {
            res.status(404);
            throw new Error("Coloque um email valido para criar a conta");
        }
        if (!password) {
            res.status(404);
            throw new Error("Coloque uma senha valida para criar a conta");
        }
        if (database_1.user.find((user1) => user1.id === id)) {
            res.status(404);
            throw new Error("ID ja existente. Insira um id valido");
        }
        if (database_1.user.find((user1) => user1.email === email)) {
            res.status(404);
            throw new Error("Email ja existente. Insira um email valido");
        }
        (0, database_1.createUser)(id, email, password);
        res.status(201).send("Novo usuario registrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.menssage);
    }
});
app.post('/product', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (!id) {
            res.status(404);
            throw new Error("coloque um id para crair um produto");
        }
        if (!name) {
            res.status(404);
            throw new Error("coloque um nome para crair um produto");
        }
        if (!price) {
            res.status(404);
            throw new Error("coloque um preço para criar um preço");
        }
        if (!category) {
            res.status(404);
            throw new Error("coloque uma categoria valida para criar um produto");
        }
        (0, database_1.createProduct)(id, name, price, category);
        res.status(201).send("Produto registrado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.get('/purchase', (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        if (!userId) {
            res.status(404);
            throw new Error("Coloque um userId para criar uma compra");
        }
        if (!productId) {
            res.status(404);
            throw new Error("Coloque um productId para criar uma compra");
        }
        if (!quantity) {
            res.status(404);
            throw new Error("Coloque uma quantidade para criar um produto");
        }
        if (!totalPrice) {
            res.status(404);
            throw new Error("Coloque um preço para crair um produto");
        }
        if (!(database_1.user.find((user1) => user1.id === userId))) {
            res.status(404);
            throw new Error("Usuario não existe");
        }
        if (!(database_1.product.find((product1) => product1.id === productId))) {
            res.status(404);
            throw new Error("O produto não existe");
        }
        const newPurchase = {
            userId, productId, quantity, totalPrice
        };
        database_1.purchase.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.get('/product/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.product.find((product1) => product1.id === id))) {
            res.status(404);
            throw new Error("O id do produto não existe");
        }
        res.status(200).send((0, database_1.getProductsById)(id));
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.get('/user/:id/purchase', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.user.find((user1) => user1.id === id))) {
            res.status(404);
            throw new Error("O id de usuario não existe");
        }
        res.status(200).send((0, database_1.getAllPurchase)(id));
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.delete('/user/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.user.find((user1) => user1.id === id))) {
            res.status(404);
            throw new Error("O id do usuario não existe");
        }
        const userIndex = database_1.user.findIndex((user) => user.id === id);
        if (userIndex >= 0) {
            database_1.user.splice(userIndex, 1);
        }
        res.status(200).send("usuario delatado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.delete('/product/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.product.find((product1) => product1.id === id))) {
            res.status(404);
            throw new Error("O id do produto não existe");
        }
        const productIndex = database_1.product.findIndex((product1) => product1.id === id);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (productIndex >= 0) {
            database_1.product.splice(productIndex, 1);
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
    res.status(200).send("produto deletado com sucesso");
});
app.put('/user/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.product.find((product1) => product1.id === id))) {
            res.status(404);
            throw new Error("O id do produto não existe ");
        }
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        const user1 = database_1.user.find((user1) => user1.id === id);
        if (!newEmail) {
            res.status(404);
            throw new Error("O email não existe");
        }
        if (!newPassword) {
            res.status(404);
            throw new Error("A senha não existe");
        }
        if (user1) {
            user1.email = newEmail || user1.email;
            user1.password = newPassword || user1.password;
            res.status(200).send("cadastro realizado com sucesso");
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
app.put(' /product/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!(database_1.product.find((product1 => product1.id === id)))) {
            res.status(404);
            throw new Error("O id do produto não existe");
        }
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        if (!newName) {
            res.status(404);
            throw new Error("Escreva um novo nome");
        }
        if (!newPrice) {
            res.status(404);
            throw new Error("Escreva um novo preço");
        }
        if (!newCategory) {
            res.status(404);
            throw new Error("Escrava uma categoria");
        }
        const product1 = database_1.product.find((product1) => product1.id === id);
        if (product1) {
            product1.name = newName || product1.name;
            product1.category = newCategory || product1.category;
        }
        res.status(200).send("produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.mensagem);
    }
});
//# sourceMappingURL=index.js.map