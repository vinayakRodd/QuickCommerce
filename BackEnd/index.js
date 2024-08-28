const express = require('express')
const cors = require('cors')
const bp = require('body-parser')

// const product = require('./Product') // Import Product.js.. This is not required while Maknig Connection with MongoDb//
const myDb = require('./MongoConnect')
const { urlencoded } = require('body-parser')




const PORT = 9000
const App = new express()

App.use(cors({origin:"*"}))
App.use(bp.json())
App.use(express.urlencoded({ extended: false}))
// App.use("/api/Products",product) // This is for MySQl Connection note this..Routing Purpose //


App.get("/api/authenticate/:UserName",async(req,resp)=>{

    const customersCollection = myDb.collection("Customers")
    const result = await customersCollection.find({CustName:req.params.UserName}, { projection: { _id: 0 } }).toArray()
    console.log("Customer = ",result)
    resp.send(result)
})





App.get("/api/GetOrderDetails", async(req,resp)=>{

    const orderDetailsCollection = myDb.collection("OrderDetails")
    const result = await orderDetailsCollection.find({}).toArray()
    resp.send(result)
})


/*

App.get("/api/GetCustomerDetails/:userName", async (req, resp) => {
    
        // Extract userName from the request body
        const User = myDb.collection("Customers")
        const UserData = req.params.userName
        console.log("USer DData "+UserData)
        // Find the user by userName
        const user = await User.find({CustName:UserData}).toArray();
        console.log("User Name: "+user)
        
        resp.send(user)
});

*/

App.post("/api/GetCustomerDetails", async (req, resp) => {
    
    // Extract userName from the request body
    const customersCollection = myDb.collection("Customers")
    const UserData = req.body
    console.log("USer DData "+UserData)
    // Find the user by userName
    const user = await customersCollection.find({CustName:UserData.CustName}).toArray();
    console.log("User Name: "+user)
    
    resp.send(user)
});



App.post("/api/AddOrderItems",async(req,resp)=>{
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

App.post("/api/AddOrders", async(req,resp)=>{
    
    // let GTotal = req.body.GTotal;
    // let currentDate = req.body.currentDate;
    // let currentTime = req.body.currentTime;
    // let OrderId = req.body.OrderId;


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


App.post("/api/GetMoreDetails",async(req,resp)=>{

    const ordersCollection = myDb.collection("Orders")
    const UserData = req.body
    
    const res = await ordersCollection.find({CustId:UserData.CustId}).toArray();
    
    resp.send(res)
})


App.post("/api/getCustomerOrders",async(req,resp)=>{


    const myData = req.body
    const OrderId = myData.OrderId
    const orderDetailsCollection = myDb.collection("OrderDetails")

    const res = await orderDetailsCollection.find({OrderId:OrderId}).toArray();

    resp.send(res)
})





App.listen(PORT,err=>{

    if(err)
        console.log(err)
    else
        console.log("Server Started at PORT "+PORT)
})