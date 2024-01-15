"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import Navigation from "../_component/navigation/layout";
import { abort } from "process";
import ProductInfo from "../UtilFunction/ProductInfo";
import Card from "../main/_UtilComponent/card";
interface inputTextContextType{
    searchText:string;
    setSearchText:Function 
}
interface ResultInfoContextType{
    result:ProductInfo[]|undefined,
    setResult:Function
}
let InputTextContext = createContext<inputTextContextType|null>(null);
let ResultInfoContext = createContext<ResultInfoContextType|null>(null)
export default function Page():ReactNode{
    const [searchText,setSearchText] = useState<string>("")
    const [result,setResult] = useState<ProductInfo[]>([])
    return (
        <div className="h-full w-full flex flex-col">
<Navigation SearchShow={false} />
<InputTextContext.Provider
value={
    {
        searchText,
        setSearchText
    }
}
>


    <PageContent setResult={setResult} result={result}/>
    
</InputTextContext.Provider>
        </div>
    )
}
function PageContent({result,setResult}:{result:ProductInfo[]|undefined,setResult:Function}):ReactNode{
const ResultContext = useContext(ResultInfoContext)!
    return(

<div className="w-full h-full flex flex-col ">
<ResultInfoContext.Provider
value={{
    result,
    setResult
}}
>
<SearchContainer/>

<ResultContainer/>
</ResultInfoContext.Provider>
        </div>
    )
}
function ResultContainer():ReactNode{
    const resultContext = useContext(ResultInfoContext)!;
let result=  resultContext.result!;
    return(
     <div className={`  gap-x-2 gap-y-5 p-3 ${(result.length===0)?" w-full h-full flex":"grid grid-cols-2 lg:grid-cols-4 "} items-center justify-center`}>
        {
         (result.length ===0) && 
             <p className="self-center justify-self-center">Nothing to show</p> 
         
        }
        {
            result.map((value,index)=>{
                return(    <Card key={index}  className="" ImageClassName="h-[9.7rem] bg-transparent" title={value.name } price={value.price} src={`/images/image_id=${value.productid}.png`} alt={`${value.productid}`} rating={value.productrating} productId={value.productid} />
                )
            })
        }
     </div>
    )
}

function SearchContainer():ReactNode{
   const searchContext = useContext(InputTextContext)
   const resultContext = useContext(ResultInfoContext)!
   const SearchIcon = ()=>  
       (  <span onClick={()=> {
        if(searchContext?.searchText===undefined || searchContext?.searchText===null || searchContext?.searchText===""){
            alert("Please fill information ")
            return
        }
        fetchResult(searchContext?.searchText,resultContext.setResult)}} className="material-symbols-outlined justify-self-end font-bold cursor-pointer" >
   search
   </span>)
    return(
        <div className="w-full h-fit p-3 flex  items-center justify-center gap-3">
            <div className=" border w-full lg:w-[50%] py-4 px-2 rounded-xl flex items-center justify-center">
                <input type="text" className=" w-full h-full outline-none " onChange={(e)=>searchContext?.setSearchText(e.target.value)} />
                <SearchIcon/>
            </div>
        </div>
    )
}

async function fetchResult(text:string|undefined,setResult:Function){
    if(text===undefined) return
    let response = await    fetch("api/get_search_product",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({text:text})

    }).then(res=>res.json()).then(res=>{setResult(res);console.log(res)});
    
}