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
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('pong!');
});
app.get('/user', (req, res) => {
    res.status(200).send(database_1.user);
});
app.get('/product', (req, res) => {
    res.status(200).send(database_1.product);
});
app.get('/product/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.product.filter((product1) => {
        return product1.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/user', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    database_1.user.push(newUser);
    res.status(201).send("Novo usuário registrado com sucesso!");
});
app.post('/product', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id, name, price, category
    };
    database_1.product.push(newProduct);
    res.status(201).send("Produto registrado com sucesso");
});
app.get('/purchase', (req, res) => {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newPurchase = {
        userId, productId, quantity, totalPrice
    };
    database_1.purchase.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
//# sourceMappingURL=index.js.map