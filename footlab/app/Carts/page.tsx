"use client"
import { ReactNode, useEffect, useState } from "react";
import ProductInfo from "../main/UtilFunction/ProductInfo";
import errorCode from "../Error/errorCode";
import { X } from "lucide-react";
import Navigation from "../_component/navigation/layout";

interface cartInfo{
    size:number;
    productid:number;
    name:string;
    price:string;
}
export default function Carts():ReactNode{
   const [products,setProducts] = useState<cartInfo[]>([])

   useEffect(()=>{
   let email = sessionStorage.getItem("email")
    fetch("api/get_carts",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email:email})

    }).then(res=>res.json()).then((res=>{setProducts(res);console.log(res)}))
   
},[])
   return(
<>
<Navigation CatergoriesListShow={false}/>
<p className="ml-3 mt-1 text-2xl tracking-wide font-semibold">Cart</p>
    
    {
        products.length ===0 && <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl font-semibold">No carts</p>
        </div>
    }
    {
       
       products.map((value,index)=>{
            return (
           <CartCards info={value} index={index} setProducts = {setProducts}/>
            )
        })
    }


</>
    )
}
function CartCards({info,index,setProducts}:{info:cartInfo,index:number,setProducts:Function}):ReactNode{
    return(

        <div className="p-2">
            <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-3 my-2">
                <div className="w-[7.89rem] h-[6.7rem] p-5 bg-card_background rounded-xl"><img src={`/images/image_id=${info.productid}.png`} className="w-fit h-fit " alt={`${info.productid}`} /></div>
                <div className="flex flex-col justify-center">
                    <p className="font-medium">{info.name}</p>
                    <p><span className="font-medium">Size</span>: {info.size}</p>
                    <p><span className="font-medium">Price</span>:{info.price}</p>
                </div>
                <div className="flex items-center justify-center p-5">
                    <X onClick={()=>deleteProduct(index,setProducts)} className="cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}
function deleteProduct(index:number,setProducts:Function){
    let email = sessionStorage.getItem("email")
    fetch("api/delete_cart_product",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email:email,index:index})
    }).then(
        res=>res.json()
    ).then(
        res=>setProducts(res)
    )
}