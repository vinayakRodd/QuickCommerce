
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState,useEffect, useRef } from 'react'
import axios from 'axios';


function Cart({MyProducts,setMyProducts,GetOrderId,setGetOrderId,CustId,setCustId,CheckOutStatus,setCheckOutStatus,cart,setCart,setCount,count,loginStatus,setLoginStatus,userType,setUserType,GTotal,setGTotal}) {

    const [OrderId,setOrderId] = useState(100);
    const SearchedProduct = useRef()

  


    const Increment = (product) =>{

        {cart.map(CartItem => (CartItem.Pid === product.Pid) ? CartItem.Qty++:"Nothing")}
        setGTotal(GTotal+product.Price)
        setCount(count+1)
        setCart([...cart])

        

    }

    

    const Decrement = (product) =>{
      let newCart = []

        if(product.Qty > 0 && GTotal > 0 && count > 0){

          {cart.map(CartItem => (CartItem.Pid === product.Pid)? CartItem.Qty--:"Nothing")}
          setGTotal(GTotal-product.Price)
          setCount(count-1)
          setCart([...cart])
        }


        if(product.Qty === 0){
          newCart = cart.filter(CartItem => CartItem.Pid !==  product.Pid)
          setCart([...newCart])
          {cart.map(CartItem => (CartItem.Pid === product.Pid)? CartItem.Qty++:"Nothing")}
        }

    }

    const confirmOrder = async () =>{

    

      const now = new Date();  // Creates a new Date object with the current date and time

      // setOrderId(OrderId+1)

      // setGetOrderId(OrderId+1)
      
      const currentDate = now.toLocaleDateString('en-GB');  // Formats the date (e.g., "8/23/2024")
      const currentTime = now.toLocaleTimeString();  // Formats the time (e.g., "4:35:18 PM")

      const myOrder = {GTotal:GTotal,Date:currentDate,Time:currentTime,CustId:CustId}

      console.log("MyOrder In FrontEnd:")
      console.log(myOrder)

      await axios.post("http://localhost:9000/api/Orders/AddOrders",myOrder)
      .then(response=>{

          alert("Orders successfully Added")
      })
      .catch(err=>{

        console.log(err)
      })

      var myItems = {OrderedItems:cart}


      await axios.post("http://localhost:9000/api/Orders/AddOrderItems",myItems)
      .then(response=>{

            alert("Items added to Order Details.."+response.data)
        
      })

      setCart([])

}

    const CheckOut = () =>{

        setCheckOutStatus(true)
        setMyProducts(MyProducts)
    }

    const getSearchedProduct = () =>{

        var SearchItem = {Category:SearchedProduct.current.value}

        axios.post("http://localhost:9000/api/Product/GetSearchedProducts",SearchItem)
        .then(response=>{

            setMyProducts(response.data)
        })
        .catch(err=>{

          console.log(err)
          
        })
    }
    
   
  return (
    <div  >
        
        <div style={{display:'flex',flexDirection:'row',gap:'50px',marginTop:'20px',marginLeft:'100px'}} >
          <input ref = {SearchedProduct} onKeyUp={getSearchedProduct} style={{height:'50px',width:'200px'}} placeholder='Search the Product' className='form-control '></input>
          <h3 >Gross Total: <span  >{GTotal}</span></h3>
          <button style={{height:'50px'}} className='btn btn-primary' onClick={CheckOut} >CheckOut</button>
          <button style={{height:'50px'}}  className='btn btn-danger' onClick={confirmOrder} >ConfirmOrder</button>
        </div>

        <br></br>
        <ul style = {{listStyle:'none'}}>
            {cart.map(product => <li>
            <div style={{display:'flex',flexDirection:'row'}} ><div style={{margin:'20px',width:'180px',marginLeft:'200px'}} >{product.Pid} {product.Pname} {product.Price} </div>
                <div style={{display:'flex',flexDirection:'row'}}  ><button onClick={()=>Increment(product)}   className='btn btn-warning m-3' >+</button>
                    <div style={{width:'10px',margin:'20px'}}>{product.Qty}</div>
                    <button onClick={()=>Decrement(product)}   className='btn btn-danger m-3' >-</button>
                    <div style={{margin:'20px'}} >{product.Price} * {product.Qty} = {product.Price * product.Qty}</div>
                </div>
            </div>
            </li>)}
        </ul>

        
        
    </div>
  )
}

export default Cart