import { addReview, getProducts } from "../controller/Product.controller.js";
import { deleteUser, getUser, getUsers, insertUser, login, register, updateUser } from "../controller/User.controller.js";
import { checkEmailAuth, checkPhoneAuth, getProductsMiddleware } from "../middlewares/User.verify.js";

export function getUsersRoute(server) {
    server.post('/insertUser', insertUser)
    server.get('/getUsers', getUsers)
    server.delete('/delUser', deleteUser)
    server.post('/updateUser', updateUser)
    server.get('/getUser', getUser)
    server.post('/register', register)
    server.post('/login', login)
    server.post('/addReview', addReview)
    server.get('/getProducts', getProductsMiddleware, checkPhoneAuth, checkEmailAuth,  getProducts)
}

