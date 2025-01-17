
import './App.css';
import Cart from './Components/Cart';
import Counter from './Components/Counter';
import Heading from './Components/Heading';
import { useEffect, useState } from "react"
import Products from './Components/Products';
import Login from './Components/Login';
import AddItem from './Components/AddItem';
import axios from 'axios';


import OrderDetails from './Components/OrderDetails';
import SignUp from './Components/SignUp';

function App() {

  const [CustId,setCustId] = useState(0)
  const [UserName,setUserName] = useState("")
  const [GetOrderId,setGetOrderId] = useState(0);
  const [SignUpStatus,setSignUpStatus] = useState(false)

  const [GTotal,setGTotal] = useState(0)

  const [MyProducts,setMyProducts] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:9000/api/Product/getAllProducts")
    .then(response=>{

        setMyProducts(response.data)
    })
  },[])



  const[userType,setUserType] = useState("")

  

  const [cart,setCart] = useState([])
  
  const [count,setCount] = useState(0);

  const [loginStatus,setLoginStatus] = useState(false)

  const [CheckOutStatus,setCheckOutStatus] = useState(false)
  


  return (
    <div className="App">


      {(!loginStatus && userType === "" && CheckOutStatus === false && !SignUpStatus ) ? <Login SignUpStatus = {SignUpStatus} setSignUpStatus = {setSignUpStatus} CustId = {CustId} setCustId = {setCustId} UserName = {UserName} setUserName = {setUserName} userType = {userType} setUserType = {setUserType} loginStatus = {loginStatus} setLoginStatus = {setLoginStatus} />
      :(userType === "Admin" && CheckOutStatus === false && SignUpStatus == false)? <AddItem  MyProducts = {MyProducts} setMyProducts = {setMyProducts} userType = {userType} setUserType = {setUserType} loginStatus = {loginStatus} setLoginStatus = {setLoginStatus}  />
      :(userType === "Customer" && CheckOutStatus === false && SignUpStatus == false)? 

        <div>
        <div style={{display:'flex',flexDirection:'row',gap:'50px'}}>
          <Heading cart = {cart} setCart = {setCart} count = {count} setCount = {setCount} GTotal = {GTotal} setGTotal = {setGTotal} setLoginStatus = {setLoginStatus} userType = {userType}   setUserType = {setUserType} />
          <Counter  count = {count}   />
        
        </div>
      
        <div style={{display:'flex',flexDirection:'row',gap:'50px'}}>
          <Products setMyProducts = {setMyProducts} UserName={UserName} MyProducts = {MyProducts} cart={cart} setCart = {setCart} count = {count} setCount = {setCount} GTotal = {GTotal} setGTotal = {setGTotal} />
          <Cart MyProducts = {MyProducts} setMyProducts = {setMyProducts} GetOrderId = {GetOrderId} setGetOrderId = {setGetOrderId} CustId = {CustId} setCustId = {setCustId} CheckOutStatus = {CheckOutStatus} setCheckOutStatus = {setCheckOutStatus}  cart = {cart} setCart = {setCart} setCount = {setCount} count = {count} loginStatus = {loginStatus} setLoginStatus = {setLoginStatus} userType = {userType} setUserType = {setUserType} GTotal = {GTotal} setGTotal = {setGTotal}  />
          
        </div>
      </div>
      :
      (SignUpStatus == false && userType == "Customer" )?
      <OrderDetails GetOrderId = {GetOrderId} setGetOrderId={setGetOrderId}  cart = {cart} setCart = {setCart} CustId = {CustId} setCustId = {setCustId} UserName = {UserName} setUserName = {setUserName}  CheckOutStatus = {CheckOutStatus} setCheckOutStatus = {setCheckOutStatus}/>
      :""
    


      
     }

     {(SignUpStatus) ? <SignUp setUserType = {setUserType} setCheckOutStatus = {setCheckOutStatus}  setLoginStatus = {setLoginStatus} setSignUpStatus = {setSignUpStatus} />:""}
      
    </div>
  );

}

export default App;
