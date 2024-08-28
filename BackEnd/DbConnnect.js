const mySql = require('mysql')

const connection = mySql.createConnection({

    host:"localhost",
    port:3306,      // database port
    user:"root",
    password:"",
    database:"shoppingcart"
    

})

connection.connect((err)=>{

    if(err)
        console.log(err)
    else    
        console.log("Connected to MySql")
})

module.exports = connection