import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";

export default function Navigation({CatergoriesListShow=true}:{CatergoriesListShow?:boolean}):ReactNode{
    const [menuShow,setMenuShow] = useState(false);
    return(
        <>
        <div className=" w-full flex pt-10 pb-4 px-5 items-center ">
<Menu setMenuShow={setMenuShow} menuShow={menuShow} className="self-center lg:hidden"/>
<Title/>  
<Search className="self-center lg:hidden"/>
        </div>
<CatergoiesListAndOption CatergoriesListShow={CatergoriesListShow}/>

<NavList menuShow = {menuShow}/>        

        </>
    )
}

function CatergoiesListAndOption({CatergoriesListShow}:{CatergoriesListShow?:boolean}):ReactNode{
    const IconGroup =({Icon1,Icon2}:{Icon1:string,Icon2:string}):ReactNode=>{
    return    <div className="hidden lg:flex   gap-3">
        <span className="material-symbols-outlined justify-self-end font-bold cursor-pointer" >
{Icon1}
</span>
<span className="material-symbols-outlined justify-self-end font-bold cursor-pointer" >
{Icon2}
</span>
        </div>
    }
    return(
<div className="flex  lg:w-[80%] lg:self-center">
<IconGroup Icon1="person" Icon2="logout"/>
{
  (CatergoriesListShow)? <CatergoriesList/> :""  
}

<IconGroup Icon1="shopping_cart" Icon2="search"/>

</div>
    )
}
function Search({className}:{className:string}):ReactNode{
    return(
        <div className={`self-center w-fit h-full flex ${className} `}>


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
const NavItem = ({Icon,title}:{Icon:string,title:string})=>{
    const router = useRouter()
 return <div className="flex gap-5 cursor-pointer" onClick={()=>router.push("/Carts")}>
        <span className="material-symbols-outlined justify-self-end font-bold" >
{Icon}
</span>
<p className="font-semibold tracking-wider">{title}</p>
</div>
}
return(
<div className={`w-full h-fit flex items-center justify-center transition-all duration-200 mb-6 ${menuShow?"opacity-100 block ":"opacity-0 hidden "}`}>
<div className={`flex flex-col gap-3 animate-fade-in   `}>
    <NavItem Icon="person" title="Account"/>
    <NavItem Icon="shopping_cart" title="Carts"/>
    <NavItem Icon="logout" title="Logout"/>
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

