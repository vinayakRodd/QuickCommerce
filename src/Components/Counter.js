import 'bootstrap-icons/font/bootstrap-icons.min.css'

function Counter({count}) {
    
  return (

    <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',height:'40px',width:'40px',borderRadius:'20px',
          justifyContent:'center',alignItems:'center',backgroundColor:'red'
          ,color:'yellow',fontSize:'20px',margin:'5px'}} >{count}</div>
        <i style={{fontSize:'60px',marginTop:'-30px',marginLeft:'-5px'}} class="bi bi-cart4"></i>

        
    </div>

  )
}

export default Counter