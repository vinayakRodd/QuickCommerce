const express = require('express')
const myDb = require('./MongoConnect')



const router = express.Router()

router.get("/authenticate/:UserName",async(req,resp)=>{

    const customersCollection = myDb.collection("Customers")
    const result = await customersCollection.find({CustName:req.params.UserName}, { projection: { _id: 0 } }).toArray()
    console.log("Customer = ",result)
    resp.send(result)
})



router.post("/GetCustomerDetails", async (req, resp) => {
    
    
    const customersCollection = myDb.collection("Customers")
    const UserData = req.body
    console.log("Before..User Id "+UserData.CustId)
    
    const user = await customersCollection.find({CustId:UserData.CustId}).toArray();
    console.log("After User Id: "+user)
    
    resp.send(user)
});

router.post("/SignUp",async(req,resp)=>{



    const customersCollection = myDb.collection("Customers")
    const UserData = req.body

    const countersCollection = myDb.collection("Counters")

    const CounterObj = await countersCollection.find({}).toArray()

    const CustId = CounterObj[1].CustId
    console.log(CounterObj)

    UserData.CustId = CustId

    const res = await customersCollection.insertOne(UserData)

    countersCollection.updateOne({CustId:CustId},{$set:{CustId:CustId+1}})


    resp.send(res)

})




module.exports = router