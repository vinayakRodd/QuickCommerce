import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Products({MyProducts,cart,setCart,setCount,count,GTotal,setGTotal}) {

    const AddItem = (Product)=>{

        
        console.log(cart)
        var isPresent;
        cart.map(p => p.Pid === Product.Pid? isPresent = true:false )

        if(!isPresent){
            setCount(count+1)
            setGTotal(GTotal+parseFloat(Product.Price))
            setCart([...cart,Product])
        }
        
        
    }



  return (
    <div>
        <ul style={{listStyle:'none',width:'500px',height:'auto',gap:'50px',marginTop:'50px'}}>
            {MyProducts.map(product => <li><div style={{display:'flex',height:'auto',width:'750px',flexDirection:'row'}} ><div style={{height:'50px',width:'140px',margin:'30px'}}>{product.Pid}  {product.Pname} {product.Price} </div>
            <img style={{margin:'10px',width:'120px',height:'120px'}} src={`/images/${product.Pname}.jpg`} />
            <button style={{height:'50px',width:'100px'}} className='btn btn-success m-4'  onClick={()=>AddItem(product)}>AddToCart</button></div>
            
            </li>)}

        </ul>


    </div>
  )
}

export default Products