"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchase = exports.createPurchase = exports.productByName = exports.getProductsById = exports.getAllProducts = exports.createProduct = exports.getAllUser = exports.createUser = exports.purchase = exports.product = exports.user = void 0;
const types_1 = require("./types");
exports.user = [
    {
        id: "12345",
        email: "ricardo@gmail.com",
        password: "rick2214"
    },
    {
        id: "54321",
        email: "pedro@gmail.com",
        password: "pedro1422"
    }
];
exports.product = [
    {
        id: "001",
        name: "Tv",
        price: 1200,
        category: types_1.CATEGORY.ELETRONICS
    },
    {
        id: "002",
        name: "X-box",
        price: 2000,
        category: types_1.CATEGORY.GAME
    }
];
exports.purchase = [
    {
        userId: "12345",
        productId: "002",
        quantity: 1,
        totalPrice: 2000
    },
    {
        userId: "54321",
        productId: "001",
        quantity: 2,
        totalPrice: 2400
    }
];
const createUser = (id, email, password) => {
    const newUser = {
        id,
        email,
        password
    };
    exports.user.push(newUser);
    console.log("cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllUser = () => {
    console.table(exports.user);
};
exports.getAllUser = getAllUser;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.product.push(newProduct);
    console.log("produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.table(exports.product);
};
exports.getAllProducts = getAllProducts;
const getProductsById = (idToSearch) => {
    return exports.product.filter((product1) => {
        return (product1.id === idToSearch);
    });
};
exports.getProductsById = getProductsById;
const productByName = (q) => {
    const query = exports.product.filter((product1) => {
        return (product1.name.toLowerCase().includes(q.toLowerCase()));
    });
    console.log(query);
};
exports.productByName = productByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchase.push(newPurchase);
    console.log("compra realizada com sucesso");
    console.table(exports.purchase);
};
exports.createPurchase = createPurchase;
const getAllPurchase = (userIdToSearch) => {
    return exports.purchase.filter((purchase1) => {
        return (purchase1.userId.toLowerCase().includes(userIdToSearch.toLowerCase()));
    });
};
exports.getAllPurchase = getAllPurchase;
//# sourceMappingURL=database.js.map