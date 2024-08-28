const express = require('express')
const myDb = require('./MongoConnect')

const router = express.Router()


router.get("/getAllProducts", async(req,resp)=>{

    const productsCollection = myDb.collection("products")
    const result = await productsCollection.find({}, { projection: { _id: 0 } }).toArray()
    console.log("I am here...")
    console.log(result)
    resp.send(result)
})


module.exports = router