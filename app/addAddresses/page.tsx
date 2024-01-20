"use client"
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Navigation from "../_component/navigation/layout";
import { useRouter } from "next/navigation";
import errorCode from "../Error/errorCode";
interface AddressesInfo{
addressLine1:string;
addressLine2:string;
addressLine3:string;

}
interface AddressesContextType {
    addresses:AddressesInfo|null;
    setAddresses:Function
}
interface ChangePageContextType{
    changePage:boolean;
    setChangePage:Function
}
const AddressesContext = createContext<AddressesContextType|null>(null);
const ChangePageContext = createContext<ChangePageContextType|null>(null)
export default function Page():ReactNode{
    const [addresses , setAddresses ] = useState<AddressesInfo>({addressLine1:"",
        addressLine2:"",
        addressLine3:""});
        const [changePage,setChangePage] = useState(false)
    return(
        <AddressesContext.Provider
        value={{
            addresses,
            setAddresses
        }}
        >
            
            <div className="w-full h-full flex flex-col">
                
            <Navigation CatergoriesListShow={false}/>
            <Content/>
            <ChangePageContext.Provider
            value={
                {
                    changePage,
                    setChangePage
                }
            }
            >


            <PayButton/>
            </ChangePageContext.Provider>
            </div>
        </AddressesContext.Provider>
    )
}
function Content():ReactNode{
    return(
        <div className="self-center w-[80%] mt-5">
        <Title value="Addresses"/>
        <InputGroup/>
        
        </div>
    )
}
function InputGroup():ReactNode{
    const context = useContext(AddressesContext)
const UpdateValue = (prevState:AddressesInfo,key:string,value:string)=>{
    let newState = {...prevState,[key]:value}
    return newState;
}
const InputBoxValue= (key:string,value:string)=>{
context?.setAddresses((prevState:AddressesInfo)=>UpdateValue(prevState,key,value))

}

return(
<div className="mt-5 flex flex-col gap-5">
    <AddressesInputBox placeholder="Enter the addresses line 1 "  setValue={(e:string)=>InputBoxValue("addressLine1",e)}/>
    <AddressesInputBox placeholder="Enter the addresses line 2 "  setValue={(e:string)=>InputBoxValue("addressLine2",e)}/>
    <AddressesInputBox placeholder="Enter the addresses line 3 "  setValue={(e:string)=>InputBoxValue("addressLine3",e)}/>

</div>
    )
}
function Title({value}:{value:string}) {
    return             <p className="text-2xl tracking-wider font-semibold">{value}</p>

}
function AddressesInputBox({placeholder,setValue}:{placeholder:string,setValue:Function}){
    return <input className="rounded-xl p-5 border"  placeholder={placeholder} onChange={(e)=>setValue(e.target.value)}/>

}
function PayButton():ReactNode {
    const router= useRouter()
    const addressContext = useContext(AddressesContext)
const getChangePageContext = useContext(ChangePageContext)
let changePage = getChangePageContext?.changePage
useEffect(()=>{
    if(changePage === true){
        router.replace("/main")
    }
},[changePage,router])

    return(
<div className="fixed bottom-5 left-0 right-0 flex items-center justify-center"><button className="w-[75%] lg:w-[15%] bg-primary py-4  text-secondary font-bold rounded-xl" onClick={()=>GoToPayment(addressContext?.addresses,getChangePageContext)}>Pay</button></div>
        )
}
async function GoToPayment(addresses:AddressesInfo|null|undefined,setChangePageContext:ChangePageContextType|null){
    let email = sessionStorage.getItem("email")
if(addresses===null||addresses===undefined||addresses.addressLine1===""){
    alert("Please fill information carefully")
    return null
}
if(email===null||email===undefined||email==="") {
    alert("Please login first")
    return null
}
fetch("api/addOrder",{
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email,address:addresses })

}).then((res)=>res.json()).then(
    res=>{
        // console.log(res)
    if(res=="200") {
        alert("Your shoes have been ordered");
       
      
    }
    else if(res==errorCode.CartEmpty) alert("Cart is empty")
    else alert("Some error occurred")
}).finally(()=>{
setChangePageContext?.setChangePage(true)
})

}