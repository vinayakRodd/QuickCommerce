import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


function Products({MyProducts,setMyProducts,UserName,cart,setCart,setCount,count,GTotal,setGTotal}) {

    const Category = useRef()

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

    

    const ShowProductsByCategory = () =>{

        if(Category.current.value !== "Select the Category"){
            var myObj = {Category:Category.current.value}

            axios.post("http://localhost:9000/api/Product/SearchCategory",myObj)
            .then(response=>{

                setMyProducts(response.data)
            })
            .catch(err=>{

                console.log(err)
                alert("Category Not Found")
            })
        }
        else{
            setMyProducts(MyProducts)
            alert("Select the Category")

        }
    }



  return (
    <div>
        <div style={{display:'flex',flexDirection:'row',gap:'30px'}}>
            <i style={{fontSize:'60px',color:'blue'}} class="bi bi-person-circle"></i>
            <h4 style={{marginTop:'30px'}} >Welcome <span>{UserName}</span></h4>
            <select ref = {Category} onChange={()=>ShowProductsByCategory()} className='form-select' style={{height:'50px',width:'200px',marginTop:'20px'}}>
                <option >Select the Category</option>
                <option>Laptop</option>
                <option>Mobile</option>
                <option>Fruit</option>
                <option>Wafers</option>
                <option>DairyProducts</option>

            </select>
        </div>
        <ul style={{listStyle:'none',width:'500px',height:'auto',gap:'50px',marginTop:'50px'}}>
            {MyProducts.map(product => <li><div style={{display:'flex',height:'auto',width:'750px',flexDirection:'row'}} ><div style={{display:'flex',flexDirection:'column',height:'50px',width:'240px',margin:'30px'}}><span>ProductId : {product.Pid}</span> <span>ProductName :- {product.Pname}</span> <span>ProductPrice :- {product.Price}</span> </div>
            <img style={{margin:'10px',width:'120px',height:'120px'}} src={`/images/${product.Pname}.jpg`} />
            <button style={{height:'50px',width:'100px'}} className='btn btn-success m-4'  onClick={()=>AddItem(product)}>AddToCart</button></div>
            
            </li>)}

        </ul>


    </div>
  )
}

export default Products