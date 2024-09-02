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

router.post("/SearchCategory",async(req,resp)=>{

    const SelectedCategory = req.body.Category

    const productsCollection = myDb.collection("products")
    console.log(SelectedCategory)
    const result = await productsCollection.find({Category:SelectedCategory},{projection:{_id:0}}).toArray()

    resp.send(result)
})

router.post("/GetSearchedProducts",async(req,resp)=>{

    const productsCollection = myDb.collection("products")

    const SearchedProduct = req.body.Category
    console.log(SearchedProduct)

    const regex = new RegExp(SearchedProduct, 'i'); 

    const items = await productsCollection.find({ Category: regex }).toArray();

    resp.send(items);
})


module.exports = router