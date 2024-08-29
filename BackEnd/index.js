const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
const Product = require('./Product')
const Customer = require('./Customer')
const Orders = require('./Orders')

// const product = require('./Product') // Import Product.js.. This is not required while Maknig Connection with MongoDb//
const myDb = require('./MongoConnect')
const { urlencoded } = require('body-parser')


const PORT = 9000
const App = new express()

App.use(cors({origin:"*"}))
App.use(bp.json())
App.use(express.urlencoded({ extended: false}))
// App.use("/api/Products",product) // This is for MySQl Connection note this..Routing Purpose //

App.use("/api/Product",Product)
App.use("/api/Customer",Customer)
App.use("/api/Orders",Orders)



App.listen(PORT,err=>{

    if(err)
        console.log(err)
    else
        console.log("Server Started at PORT "+PORT)
})