const express = require('express')
const myDb = require('./MongoConnect')

const router = express.Router()



router.post("/getCustId",async(req,resp)=>{

    const ordersCollection = myDb.collection("Orders")
    const UserData = req.body
    
    const res = await ordersCollection.find({CustId:UserData.CustId}).toArray();
    
    resp.send(res)
})





module.exports = router