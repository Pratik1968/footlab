import { ReactNode, useEffect, useState } from "react";
import Title from "../../_UtilComponent/title";
import Card from "../../_UtilComponent/card";
import ProductInfo from "../../../UtilFunction/ProductInfo";

export default function CustomProductGrid({title,subtitle,url,toId,fromId}:{title:string,subtitle:string,url:string,toId:number,fromId:number}):ReactNode{
    const [productInfo,setProductsInfo] = useState<ProductInfo[]>([])
    return(
        <div className="self-center w-full lg:w-[80%]  h-fit  flex flex-col ">
            <Title title={title} subtitle={subtitle}/>
            <Grid productInfo ={productInfo} setProductsInfo ={setProductsInfo} url={url} to={toId} from={fromId}/>
        </div>
    )
}
function Grid({productInfo,setProductsInfo,url,to,from}:{productInfo:ProductInfo[],setProductsInfo:Function,url:string,to:number,from:number}):ReactNode{
    useEffect(()=>{
       
fetch(url,{
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({to:to,from:from}),
}).then(res=>res.json()).then(res=>{setProductsInfo(res);}); 
        
    },[])
    return(
        <div className="lg:self-center w-full    h-fit flex flex-col  lg:flex-row  gap-5 ">
            {
            (productInfo[0])? <BigImage value={productInfo[0]}/>:""
            }
        <div className="self-center w-[80%]  gap-6  grid grid-cols-2 lg:flex-1 ">
            
                {
                    productInfo.map((value,index)=>{
                        if(index===0) return
                        return <Card key={index}  className="min-w-[9rem] min-h-[9.7rem] lg:h-full" ImageClassName="lg:min-h-[80%] lg:h-[80%] lg:max-h-[80%] lg:p-10" TitleClassname="text-xs lg:text-sm" PriceClassname="text-xs lg:text:lg" title={value.name } price={value.price} src={`/images/image_id=${value.productid}.png`} alt={`${value.productid}`} rating={value.productrating} productId={value.productid} />
                    })
                }
        </div> </div>
    )
}
function BigImage({value}:{value:ProductInfo}):ReactNode{
    return(
<Card className="self-center rounded-none  w-[80%] lg:w-full min-h-[9.7rem] lg:h-full lg:flex-1" ImageClassName="min-h-[70%] lg:h-[85%]" TitleClassname="lg:text-lg" title={value.name } price={value.price} src={`/images/image_id=${value.productid}.png`} alt={`${value.productid}`} rating={value.productrating} productId={value.productid}/>
        )
}