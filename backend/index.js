const express = require('express')
const app = express()
const cors = require('cors')
const { port, DBConnection } = require('./Config/app-config')
const userApi = require('./API/user-api')
const productApi = require('./API/product-api')
const categoryApi = require('./API/category-api')
const cartApi = require('./API/cart-api')
const cookieParser = require('cookie-parser')



//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

//API
userApi(app)
productApi(app)
categoryApi(app)
cartApi(app)


//Db Connection
DBConnection('E-Gaming')

//Run Server
app.listen(port)