const express = require('express')
const myDb = require('./MongoConnect')

const router = express.Router()

router.get("/authenticate/:UserName",async(req,resp)=>{

    const customersCollection = myDb.collection("Customers")
    const result = await customersCollection.find({CustName:req.params.UserName}, { projection: { _id: 0 } }).toArray()
    console.log("Customer = ",result)
    resp.send(result)
})



// router.post("/getCustomerOrderDetails", async (req, resp) => {
    
//     // Extract userName from the request body
//     const customersCollection = myDb.collection("Customers")
//     const UserData = req.body
//     console.log("USer DData "+UserData)
//     // Find the user by userName
//     const user = await customersCollection.find({CustName:UserData.CustName}).toArray();
//     console.log("User Name: "+user)
    
//     resp.send(user)
// });


// router.post("/getCustomerOrders",async(req,resp)=>{


//     const myData = req.body
//     const OrderId = myData.OrderId
//     const orderDetailsCollection = myDb.collection("OrderDetails")

//     const res = await orderDetailsCollection.find({OrderId:OrderId}).toArray();

//     resp.send(res)
// })





module.exports = router