import React, { useState,useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'




function OrderDetails({GetOrderId,setGetOrderId,cart,setCart,CustId,setCustId,UserName,setUserName,CheckOutStatus,setCheckOutStatus,userName}) {
  

  const [OrderDetails,setOrderDetails] = useState([])
  const [CustomerDetails,setCustomerDetails] = useState([])
  const [AmtDetails,setAmtDetails] = useState([])
  const [ProductDetails,setProductDetails] = useState([])

  const BackToCart = () =>{

    setCheckOutStatus(false);
  }

  const GetOrderDetails = async() =>{

     // alert("Your Order Details are....")

      // await axios.get("http://localhost:9000/api/GetOrderDetails")
      // .then(response=>{
  
      

      //       setOrderDetails(response.data)
      // })

    //  alert(UserName)
      var CustomerDetail = {CustName:UserName}
      console.log(CustomerDetail)
      await axios.post("http://localhost:9000/api/GetCustomerDetails",CustomerDetail)
      .then(response=>{
  
            setCustomerDetails(response.data)
      })

      var myData = {CustId:CustId}
      await axios.post("http://localhost:9000/api/GetMoreDetails",myData)
      .then(response=>{

            setAmtDetails(response.data)
      })

      
      // const updatedProducts = cart.map(product => ({
      //   ...product,
      //   OrderId: GetOrderId
      // }));

      setProductDetails([...ProductDetails,cart])


      var myItems = {OrderedItems:cart}


      await axios.post("http://localhost:9000/api/AddOrderItems",myItems)
      .then(response=>{

            alert("Items added to Order Details.."+response.data)
        
      })

      

  }//End of GetOrderDetails

  const ShowOrderDetails = async(detail) =>{

      const myData = {OrderId:detail.OrderId}

      await axios.post("http://localhost:9000/api/getCustomerOrders",myData)
      .then(response=>{

            setOrderDetails(response.data)
            console.log("OrderDetails: ")
            console.log(response.data)

      })
      
  }


  return (
    <div style={{display:'flex',flexDirection:'column',gap:'50px'}}>
       <div>OrderDetails</div>
       <button className='btn btn-warning' style={{height:'50px',width:'100px'}} onClick={BackToCart} >GoToCart</button>
       <button className='btn btn-danger' style={{height:'50px',width:'150px'}} onClick={GetOrderDetails} >ShowOrderDetails</button>
       <div>{CustomerDetails.map(Customer=><ul style={{listStyle:'none'}}><li>
        <div style={{display:'flex',flexDirection:'row'}} ><div style={{margin:'20px',width:'180px'}} >{Customer.CustId} {Customer.CustName} {Customer.Password} {Customer.Address} </div>
        </div>

       </li></ul>)
        }</div>
        <ul style = {{listStyle:'none'}} className='list-group m-2'>
        {AmtDetails.map(detail=><li className='list-group-item m-1 w-50'>

          <span style={{display:'inline-block',width:'100px' }} >{detail.OrderId} </span>
          <span style={{display:'inline-block',width:'160px' }} >{detail.Date} </span>
          <span style={{display:'inline-block',width:'170px' }} >{detail.GTotal} </span>
          <span style={{display:'inline-block',width:'180px' }} >{detail.CustId} </span>
          <span style={{display:'inline-block',width:'60px' }} ><i onClick={()=>ShowOrderDetails(detail)} style={{fontSize:'30px',color:'red'}} class="bi bi-plus-circle"></i></span>

       </li>)
        }</ul>
        
       <ul style = {{listStyle:'none'}} className='list-group m-2'>
            {OrderDetails.map(Item => 
            <li className='list-group-item m-1 w-50' >
              <span style={{display:'inline-block',width:'60px' }} >{Item.Pid}</span>
              <span style={{display:'inline-block',width:'160px' }} > {Item.Pname}</span>
              <span style={{display:'inline-block',width:'80px' }} >{Item.Price}</span>
              <span style={{display:'inline-block',width:'60px' }} >  {Item.Qty}</span>
              <span style={{display:'inline-block',width:'60px' }} >{Item.OrderId}</span>


               </li>
           
           )}
        </ul> 
    </div>
   
  )
}

export default OrderDetails