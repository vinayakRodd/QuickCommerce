const express = require('express')
const myDb = require('./MongoConnect')

const router = express.Router()


router.post("/addOrders", async(req,resp)=>{
    
    

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



router.post("/addOrderItems",async(req,resp)=>{
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




router.post("/getCustomerOrders",async(req,resp)=>{


    const myData = req.body
    const OrderId = myData.OrderId
    const orderDetailsCollection = myDb.collection("OrderDetails")

    const res = await orderDetailsCollection.find({OrderId:OrderId}).toArray();

    resp.send(res)
})



router.post("/getCustomerOrderDetails", async (req, resp) => {
    
    // Extract userName from the request body
    const customersCollection = myDb.collection("Customers")
    const UserData = req.body
    console.log("USer DData "+UserData)
    // Find the user by userName
    const user = await customersCollection.find({CustName:UserData.CustName}).toArray();
    console.log("User Name: "+user)
    
    resp.send(user)
});









module.exports = router