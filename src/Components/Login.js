import React, {useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';


function Login({CustId,setCustId,UserName,setUserName,loginStatus,setLoginStatus,userType,setUserType}) {

    
    let login = useRef("")
    let Pwd = useRef("")
    let TypeUser = useRef("")


    const authenticate = () =>{


        axios.get("http://localhost:9000/api/Customer/authenticate/"+login.current.value)
        .then(response=>{

            
            if(response.data[0].CustName === login.current.value && (parseInt)(Pwd.current.value) === response.data[0].Password){

                
                alert("Welcome "+login.current.value)
                setLoginStatus(true)
                setUserType("Customer")
                setUserName(login.current.value)
                setCustId(response.data[0].CustId)
            }
            else{

                alert("Access Denied")
            }

        })
        .catch(err=>{

            console.log(err)
        })
        
    }

  return (
    <div>

        <div style={{backgroundColor:'darkslategray',height:'500px',width:'600px',marginLeft:'300px',marginTop:'100px',padding:'40px'}}>

            <input autoFocus ref = {TypeUser} value="Customer" type='text' className='form-control m-3 w-50' placeholder='UserType' />
            <input autoFocus ref = {login} type='text' className='form-control m-3 w-50' placeholder='UserName' />
            <input ref = {Pwd} type='password' className='form-control m-3 w-50'  placeholder='Password' />
            <button onClick={authenticate}  className='btn btn-danger m-3 w-50' >Login</button>
            
        </div>

    </div>
  )
}

export default Login