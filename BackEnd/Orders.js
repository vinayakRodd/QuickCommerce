const express = require('express')
const myDb = require('./MongoConnect')

const router = express.Router()


router.post("/AddOrders", async(req,resp)=>{
    
    

    var myOrders = []
    myOrders = req.body
    
    const countersCollection = myDb.collection("Counters")
    const OrderIdObj = await countersCollection.find({}).toArray()

    const OrderId = OrderIdObj[0].OrderId

    const updatedOrders = myOrders.map(order => ({
        ...order,
        OrderId:OrderId

      }));

    const ordersCollection = myDb.collection("Orders")

    try{

        ordersCollection.insertMany(updatedOrders)
    }

    catch(err){

        console.log(err)
    }
        
    resp.send("Order Saved")


})



router.post("/AddOrderItems",async(req,resp)=>{
    var Items = []
    Items = req.body.OrderedItems;


    console.log("OrderDetails")
    console.log(Items)

    const orderDetailsCollection = myDb.collection("OrderDetails")

    const countersCollection = myDb.collection("Counters")
    const OrderIdObj = await countersCollection.find({}).toArray()

    const OrderId = OrderIdObj[0].OrderId
    const updatedProducts = Items.map(product => ({
        ...product,
        OrderId: OrderId

      }));

    try{
            await orderDetailsCollection.insertMany(updatedProducts)
            countersCollection.updateOne({OrderId:OrderId},{$set:{OrderId:OrderId+1}})
    }

    catch(err){

        console.log(err)
    }
        
    resp.send("Data Inserted")


})


router.post("/GetMoreDetails",async(req,resp)=>{

    const ordersCollection = myDb.collection("Orders")
    const UserData = req.body
    
    const res = await ordersCollection.find({CustId:UserData.CustId}).sort({ createdAt: -1 }).limit(5).toArray();
    
    resp.send(res)
})





router.post("/getCustomerOrders",async(req,resp)=>{


    const myData = req.body
    const OrderId = myData.OrderId
    const orderDetailsCollection = myDb.collection("OrderDetails")
    console.log("Fetching data thru OrderId in OrderDetails ",OrderId)

    const res = await orderDetailsCollection.find({OrderId:OrderId}).toArray();
    console.log("After fetching OrderId is = ",res.OrderId)
    resp.send(res)
})












module.exports = router