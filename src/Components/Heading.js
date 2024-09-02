import React from 'react'

function Heading({cart,setCart,count,setCount,GTotal,setGTotal,setLoginStatus,setUserType}) {

  const Empty = () =>{
        
    cart.map(c=>c.Qty=1)
    setCart([])
    setCount(0)
    setGTotal(0)
  }

  const LogOut = () =>{

    setLoginStatus(false)
    setUserType("")
  }

  

  return (
    <div style={{display:'flex',flexDirection:'row',gap:'50px',marginTop:'25px'}} >

          <h3 style = {{marginLeft:'500px'}} >Zomato Quick Commerce</h3>
          <button className='btn btn-warning' style = {{alignSelf:'self-start',height:'50px',marginLeft:'200px'}} onClick={Empty}>Empty</button>
          <img src='/images/LogOut.jpg' height='70px' width='70px' style={{marginTop:'-10px'}} onClick={LogOut} ></img>
      </div>
  )
}

export default Heading