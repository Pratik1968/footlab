"use client"
import { ReactNode, useEffect, useState } from "react";
import Card from "../../_UtilComponent/card";
import Title from "../../_UtilComponent/title";
import ProductInfo from "../../UtilFunction/ProductInfo";
import { title } from "process";

export default function CustomProductHorizontalList({title,subtitle,url,toId,fromId}:{title:string,subtitle:string,url:string,fromId:number,toId:number}):ReactNode{
    const [products,setProducts] = useState<ProductInfo[]>([])
    useEffect(()=>{

fetch(url,{
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({to:toId,from:fromId}),
}).then(res=>res.json()).then(res=>{setProducts(res)});
},[ ])
    return(
        <div className="w-full lg:w-[80%] lg:self-center h-fit">
<Title title={title} subtitle={subtitle}/>
<div className="w-full  min-h-[8.14rem]    pl-4 pb-4 flex gap-5 overflow-y-clip  overflow-x-scroll whitespace-nowrap">
  {
    products.map((value,index)=>{
        return(    <Card key={index}  className="min-w-[12rem] min-h-[9.7rem]" title={value.name } price={value.price} src={`/images/image_id=${value.productid}.png`} alt={`${value.productid}`} rating={value.productrating} productId={value.productid} />
        )
    })
  }


  
    

</div>
        </div>
    )
}

