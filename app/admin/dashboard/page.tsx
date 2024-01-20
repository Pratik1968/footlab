"use client"
import { adminSession, setAdminSession } from "@/app/util/adminSession";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";

export default function Page():ReactNode{
  const [order,setOrder]= useState([])
  useLayoutEffect(()=>{
    console.log(adminSession)
    if(!adminSession){
        console.log("should not be here")
        redirect("/")
    }
  })

  return(
<div className="w-full h-fit flex flex-col pt-10 gap-5">
<PageTitle setOrder = {setOrder}/>
<Title value="Orders"/>
<OrderList order={order} setOrder={setOrder}/>
</div>
    )
}
function PageTitle({setOrder}:{setOrder:Function}):ReactNode{
    const router = useRouter()   
    const loadData = ()=>{
        fetch("../api/get_admin_orders").then(res=>res.json()).then(res=>{setOrder(res);})

    }
    return(
    

           <div  role="button" className="w-full outline-[none] self-center  grid grid-cols-[1fr_6fr_1fr] items-center  cursor-pointer">
                            <span className="flex-1 material-symbols-outlined justify-self-end font-bold cursor-pointer pl-3" onClick={()=>{setAdminSession(false);router.replace("/login");console.log("from log out button")}} >
logout
</span>
        
           <div className="flex-1 self-center flex items-center justify-center">
               <p  className="text-4xl font-extrabold">Footlab</p>
           </div>
           <div  role="button" className="w-full outline-[none] self-center  flex items-center  cursor-pointer" onClick={()=>loadData()}>
                            <span className="flex-1 material-symbols-outlined justify-self-end font-bold cursor-pointer pl-3"  >
restart_alt
</span>
</div>
           </div>
    
    )
    }

    function Title({value}:{value:string}) {
        return   <div className="w-full flex items-center justify-center">          <p className="ml-3 mt-1 text-2xl tracking-wide font-semibold">{value}</p></div>
    
    }
    function OrderList({order,setOrder}:{order:any,setOrder:Function}):ReactNode{
        useEffect(()=>{
            fetch("../api/get_admin_orders").then(res=>res.json()).then(res=>{setOrder(res);})
        },[true])
        return(
            <div className="w-full h-full flex flex-col">
{
    order.map((value:any,index:any)=>{
return <Card key={index} value={value}/>
    },[true])
}
            </div>
        )
    }
    function Card({value}:{value:any}):ReactNode{

const options = [
    {value:"Pending",label:"Pending"},
    {value:"On Way",label:"On Way"},
    {value:"Reached",label:"Reached"},
]
const handleStatusChange = async (e:any)=>{
   const selected = e.target.value
let response = await    fetch("../api/set_admin_order_status",{
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({id:value.id,selected:selected})

}).then(res=>res.json()).then(res=>(res==="2")?alert("Some error happended"):"");


}
        
        return(
            <div className="w-full h-full flex flex-col p-5 gap-2">
<p className="font-bold text-2xl">Order No:#{value.id}</p>
<p><span className="font-semibold">Email :</span>{value.email}</p>
<p><span className="font-semibold">Status : </span>
<select className="w-full p-2 border bg-transparent" name="" defaultValue={value.status} onInput={handleStatusChange} >
    <option value="Pending">Pending</option>
    <option value="On Way">On Way</option>
    <option value="Reached">Reached</option>
</select>

 </p>
<p><span className="font-semibold">Address :</span> {value.address}</p>
<div className="w-full flex items-center justify-center">
    <p className="font-bold text-lg">Carts</p>
</div>
<TableCol  items={value.productids} />
            </div> 
        )
    }
function TableCol({items}:{items:any}):ReactNode{
    const Row = ({value}:{value:any})=>{
        return (
            <>

            <p  className="self-center justify-self-center">{value.productid}</p>
            <p  className="self-center justify-self-center">{value.name}</p>
            <p  className="self-center justify-self-center">{value.price}</p>
            <p  className="self-center justify-self-center">{value.size}</p>
            </>
        )
    }
    return(
        <div className="self-center w-full grid grid-cols-4 gap-3 justify-center items-center">
<p className="self-center justify-self-center">Product Id</p>
<p className="self-center justify-self-center">Name</p>
<p className="self-center justify-self-center">Price</p>
<p className="self-center justify-self-center">Size</p>
{
    items.map((value:any,index:any)=>{
        return (
         <Row key={index} value={value}/>
        )
    })
}
        </div>
    )
}
