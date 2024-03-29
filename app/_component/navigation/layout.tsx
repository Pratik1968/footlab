import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
export default function Navigation({CatergoriesListShow=true,SearchShow=true}:{CatergoriesListShow?:boolean,SearchShow?:boolean}):ReactNode{
    const [menuShow,setMenuShow] = useState(false);
    return(
        <>
        <div className=" w-full flex pt-10 pb-4 px-5 items-center ">
<Menu setMenuShow={setMenuShow} menuShow={menuShow} className="self-center lg:hidden"/>
<Title/>  
{SearchShow && <Search className="self-center lg:hidden"/>}
        </div>
<CatergoiesListAndOption CatergoriesListShow={CatergoriesListShow} SearchShow ={SearchShow}/> 

<NavList menuShow = {menuShow}/>        

        </>
    )
}

function CatergoiesListAndOption({CatergoriesListShow,SearchShow}:{CatergoriesListShow?:boolean,SearchShow:boolean}):ReactNode{
    const IconGroup =({Icon1,Icon2,onClick1,onClick2,Icon2Show=true}:{Icon1:string,Icon2:string,onClick1:Function,onClick2:Function,Icon2Show?:boolean}):ReactNode=>{
    return    <div className="hidden lg:flex   gap-3 ">
        <span className="material-symbols-outlined justify-self-end font-bold cursor-pointer" onClick={()=>onClick1()}>
{Icon1}
</span>
{Icon2Show && <span className="material-symbols-outlined justify-self-end font-bold cursor-pointer" onClick={()=>onClick2()}>
{Icon2}
</span>}
        </div>
    }
    const router = useRouter()
    const logout = ()=>{
        console.log("logout")
        sessionStorage.clear()
        router.push("/login")
    }
    return(
<div className="flex  lg:w-[80%] lg:self-center lg:justify-between">
<IconGroup Icon1="shopping_bag" Icon2="logout" onClick1={()=>router.push("/MyOrders")} onClick2={()=>logout()}/>
{
  CatergoriesListShow && <CatergoriesList/>  
}

<IconGroup Icon1="shopping_cart" Icon2="search" onClick1={()=>{router.push("/Carts")}} Icon2Show={SearchShow} onClick2={()=>{router.push("/SearchPage")}}/>

</div>
    )
}
function Search({className}:{className:string}):ReactNode{
   const router = useRouter()
    return(
        <div className={`self-center w-fit h-full flex ${className} `} onClick={()=>router.push("/SearchPage")}>


        <span className="material-symbols-outlined cursor-pointer" style={{fontSize:"30px"}}>
search
</span>
        </div>
    )
}
function Menu({setMenuShow,menuShow,className}:{setMenuShow:Function,menuShow:boolean,className:string}):ReactNode{
    return(
        <div className={`self-center w-fit h-full flex items-center justify-center ${className}`} onClick={()=>setMenuShow(!menuShow)}>
    { menuShow?
    <span className="material-symbols-outlined cursor-pointer animate-[spin_0.5s_ease_1]" style={{fontSize:"30px"}} >
    close
    </span>
    :   <span className="material-symbols-outlined cursor-pointer" style={{fontSize:"30px"}} >
menu
</span>
}
        </div>
    )
}
function Title():ReactNode{
const router = useRouter()
    return(

       
       <div  role="button" className="outline-[none] self-center flex-1 flex justify-center cursor-pointer">
       <p onClick={()=>router.push("/main")} className="text-4xl font-extrabold">Footlab</p>
       </div>

)
}
function NavList({menuShow}:{menuShow:boolean}):ReactNode{
    const router = useRouter()

    const NavItem = ({Icon,title,onClick}:{Icon:string,title:string,onClick:Function})=>{
 return <div className="flex gap-5 cursor-pointer" onClick={()=>onClick()}>
        <span className="material-symbols-outlined justify-self-end font-bold" >
{Icon}
</span>
<p className="font-semibold tracking-wider">{title}</p>
</div>
}
const logout = ()=>{
    sessionStorage.clear()
    router.push("/login")
}
return(
<div className={`w-full h-fit flex items-center justify-center transition-all duration-200 mb-6 ${menuShow?"opacity-100 block ":"opacity-0 hidden "}`}>
<div className={`flex flex-col gap-3 animate-fade-in   `}>
    <NavItem Icon="shopping_bag" title="My Orders" onClick={()=>router.push("/MyOrders")}/>
    <NavItem Icon="shopping_cart" title="Carts" onClick={()=>router.push("/Carts")}/>
    <NavItem Icon="logout" title="Logout" onClick={()=>logout()}/>
</div>

</div>
    );
}

function CatergoriesList():ReactNode{
   const ListItem =({text}:{text:string})=><p className="text-sm  font-semibold tracking-wider text-center" >{text}</p>
    return(
        <div className="w-full h-fit p-2 flex gap-6 items-center justify-center pb-6">
<ListItem text="FOR MEN"/>
<ListItem text="FOR WOMEN"/>
<ListItem text="FOR KIDS"/>
<ListItem text="BRANDS"/>

        </div>
    )
}

