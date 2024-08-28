import React, { useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

function AddItem({MyProducts,setMyProducts,userType,setUserType,loginStatus,setLoginStatus}) {

    let ProductID = useRef("")
    let ProductName = useRef("")
    let ProductPrice = useRef("")

    

    const AddNewItem = () => {
        
        let PName = ProductName.current.value
        let Pid  = ProductID.current.value
        let PPrice = ProductPrice.current.value

        setMyProducts([...MyProducts,{Pid:Pid,Pname:PName,Price:PPrice,Qty:1}])
        
    }

    const LoginPage = () =>{

        setUserType("")
        setLoginStatus(false)
    }

  return (
    <div>AddItem

    <input  ref={ProductID}  placeholder='Enter ProductID' ></input>
    <input ref={ProductName} placeholder='Enter ProductName'></input>
    <input ref={ProductPrice}  placeholder='Enter ProductPrice'></input>
    <button onClick={AddNewItem} >AddItem</button>
    <button onClick={LoginPage} >LoginPage</button>
    </div>
  )
}

export default AddItem