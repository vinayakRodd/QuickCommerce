import React, { useState,useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'




function OrderDetails({GetOrderId,setGetOrderId,cart,setCart,CustId,setCustId,UserName,setUserName,CheckOutStatus,setCheckOutStatus,userName}) {
  

  const [OrderDetails,setOrderDetails] = useState([])
  const [CustomerDetails,setCustomerDetails] = useState([])
  const [AmtDetails,setAmtDetails] = useState([])
  // const [ProductDetails,setProductDetails] = useState([])

  const BackToCart = () =>{

    setCheckOutStatus(false);
  }

  const GetOrderDetails = async() =>{

  
      
      var CustomerDetail = {CustId:CustId}
      console.log(CustomerDetail)
      
      await axios.post("http://localhost:9000/api/Customer/GetCustomerDetails",CustomerDetail)
      .then(response=>{

            console.log("GetCustomerDetails: ",response.data)
            setCustomerDetails(response.data)
      })

      alert("AmtDetails:")
      var myData1 = {CustId:CustId}
      await axios.post("http://localhost:9000/api/Orders/GetMoreDetails",myData1)
      .then(response=>{

          console.log("GetMoreDetails: ",response.data)
          setAmtDetails(response.data)
    })

    }




  const ShowOrderDetails = async(detail) =>{

      const myData = {OrderId:detail.OrderId}

      await axios.post("http://localhost:9000/api/Orders/getCustomerOrders",myData)
      .then(response=>{

            setOrderDetails(response.data)
            console.log("OrderDetails: ")
            console.log(response.data)

      })

      
      
  }


  return (
    
    <div style={{display:'flex',flexDirection:'column',gap:'50px'}}>
       <h3 style={{alignSelf:'center',marginTop:'50px'}} >Order Details</h3>

      <div style={{display:'flex',flexDirection:'row',gap:'50px'}} >
        <button className='btn btn-warning' style={{height:'50px',width:'100px'}} onClick={BackToCart} >GoToCart</button>
        <button className='btn btn-danger' style={{height:'50px',width:'150px'}} onClick={GetOrderDetails} >ShowOrderDetails</button>
      </div>

      <div>{CustomerDetails.map(Customer=>
      
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}} >

            <h3>CustomerId : <span>{Customer.CustId}</span></h3>
            <h3>CustomerName : <span>{Customer.CustName} </span></h3>
            <h3>Address : <span>{Customer.Address}</span></h3>
   
        </div>)
        }
        
        </div>

        

      <div style={{display:'flex',flexDirection:'row',gap:'50px'}}>
        

        <ul style = {{listStyle:'none'}} className='list-group'>
          <li style={{textAlign:'center'}} className='list-group-item m-1 w-100'><h3 style={{color:'red'}}>Orders</h3></li>
          <li className='list-group-item m-1 w-100'>

            <span style={{display:'inline-block',width:'105px' }} ><h5>OrderId</h5> </span>
            <span style={{display:'inline-block',width:'160px' }} ><h5>OrderDate</h5> </span>
            <span style={{display:'inline-block',width:'170px' }} ><h5>TotalAmt</h5> </span>
            


          </li>

        {AmtDetails.map(detail=><li className='list-group-item m-1 w-100'>

          <span style={{display:'inline-block',width:'110px' }} >{detail.OrderId} </span>
          <span style={{display:'inline-block',width:'160px' }} >{(new Date).toLocaleDateString('en-GB')} </span>
          <span style={{display:'inline-block',width:'170px' }} >{detail.GTotal.toFixed(2)} </span>
    
          <span style={{display:'inline-block',width:'60px' }} ><i onClick={()=>ShowOrderDetails(detail)} style={{fontSize:'30px',color:'red'}} class="bi bi-plus-circle"></i></span>

       </li>)
        }</ul>
        
        
       <ul style = {{listStyle:'none'}} className='list-group'>
       <li style={{textAlign:'center'}} className='list-group-item m-1 w-100'><h3 style={{color:'orange'}}>OrderItems</h3></li>
          <li className='list-group-item m-1 w-100'>

            <span style={{display:'inline-block',width:'100px' }} ><h5>CustId</h5> </span>
            <span style={{display:'inline-block',width:'140px' }} ><h5>PName</h5> </span>
            <span style={{display:'inline-block',width:'140px' }} ><h5>ProdImage</h5> </span>
            <span style={{display:'inline-block',width:'110px' }} ><h5>ItemAmt</h5> </span>
            <span style={{display:'inline-block',width:'80px' }} ><h5>Qty</h5> </span>
            <span style={{display:'inline-block',width:'80px' }} ><h5>OrderId</h5> </span>

          </li>



            {OrderDetails.map(Item =>
            <li className='list-group-item m-1 w-100' >
              <span style={{display:'inline-block',width:'105px' }} >{Item.Pid}</span>
              <span style={{display:'inline-block',width:'140px' }} > {Item.Pname}</span>
              <span style={{display:'inline-block',width:'140px' }} ><img width='100px' height='100px' src={`/images/${Item.Pname}.jpg`}></img> </span>
              <span style={{display:'inline-block',width:'110px' }} >{Item.Price.toFixed(2)}</span>
              <span style={{display:'inline-block',width:'80px' }} >  {Item.Qty}</span>
              <span style={{display:'inline-block',width:'80px' }} >{Item.OrderId}</span>


               </li>
           
           )}
        </ul> 
      </div>
    </div>
   
  )
}

export default OrderDetails