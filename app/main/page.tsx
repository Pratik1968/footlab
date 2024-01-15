"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Navigation from "../_component/navigation/layout";
import Hero from "./_component/hero/layout";
import CustomProductHorizontalList from "./_component/customProductHorizontalList/layout";
import  CustomProductGrid  from "./_component/customProductGrid/layout";
import PageFooter from "../_component/footer/layout";

export default function main():ReactNode{
   let count =0 
   let router = useRouter()
useEffect(()=>{
    count++;

    let name = sessionStorage.getItem("name")
    let email = sessionStorage.getItem("email")
    
    if( name===""||name===null||email===""||email===null){
        if(count==1){

            alert("Please Sign in to Account")
router.replace("/SignUp")
        }
    }
},[])

    
return(
<div className="w-full h-full flex flex-col">
    <Navigation SearchShow ={false}/>
<Body/>
</div>

        )
} 

function Body():ReactNode{
    return(
        <div className="flex w-full h-full flex-col gap-[4rem]">
<Hero/>
<CustomProductHorizontalList title="featured" subtitle="PRODUCT" url="api/get_products" toId={14} fromId={1}/>
<CustomProductGrid title="Best" subtitle="SELLER" url="api/get_products" toId={11} fromId={7}/>
<CustomProductHorizontalList title="Nike" subtitle="COLLECTION" url="api/get_products" toId={19} fromId={12}/>
<CustomProductGrid title="Addidas" subtitle="COLLECTION" url="api/get_products" toId={24} fromId={20}/>
<CustomProductHorizontalList title="Reebok" subtitle="COLLECTION" url="api/get_products" toId={20} fromId={12}/>
<PageFooter/>
        </div>
    )
}