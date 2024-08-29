import React, {useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';


function Login({SignUpStatus,setSignUpStatus,CustId,setCustId,UserName,setUserName,loginStatus,setLoginStatus,userType,setUserType}) {

    
    let login = useRef("")
    let Pwd = useRef("")
    let TypeUser = useRef("")


    const authenticate = () =>{


        axios.get("http://localhost:9000/api/Customer/authenticate/"+login.current.value)
        .then(response=>{

            
            if(response.data[0].CustName === login.current.value && Pwd.current.value === response.data[0].Password){

                
                alert("Welcome "+login.current.value)
                setLoginStatus(true)
                setUserType("Customer")
                setUserName(login.current.value)
                setCustId(response.data[0].CustId)
                setSignUpStatus(false)
                
            }
            else{

                alert("Access Denied")
            }

        })
        .catch(err=>{

            console.log(err)
            alert("Access Denied")
        })
        
    }

    const SignUp = () =>{

        setSignUpStatus(true)
        setLoginStatus(false)
    }

  return (
    <div className='Login' >
        
        <div style={{boxShadow:'0 .28vw .57vw 0 rgba(0, 0, 0, 0.2), 0 .42vw 1.42vw 0 rgba(0, 0, 0, 0.19) ',height:'500px',width:'600px',marginLeft:'300px',marginTop:'100px',padding:'50px'}}>
            <h3 style={{marginLeft:'20px',fontSize:'3rem'}}>Quick Commerce</h3>
            <input style={{width:'400px',height:'40px'}} autoFocus ref = {TypeUser} value="Customer" type='text' className='form-control m-3' placeholder='UserType' />
            <input style={{width:'400px',height:'40px'}} autoFocus ref = {login} type='text' className='form-control m-3' placeholder='UserName' />
            <input style={{width:'400px',height:'40px'}} ref = {Pwd} type='password' className='form-control m-3'  placeholder='Password' />
            <button onClick={authenticate}  className='btn btn-danger m-3' >Login</button>
            <button onClick={SignUp}  className='btn btn-warning m-3' >SignUp</button>
        </div>

    </div>
  )
}

export default Login