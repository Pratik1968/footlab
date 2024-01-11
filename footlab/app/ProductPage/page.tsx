"use client"
import { useSearchParams } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import ProductInfo from "../main/UtilFunction/ProductInfo"
import Navigation from "../_component/navigation/layout"
import Rating from "../_componentUtil/ratingComponent"
import PageFooter from "../_component/footer/layout"
import AlertBox from "../_component/alert/layout"
import Link from "next/link"

export default function ProductPage():ReactNode{
    const [productInfo,setProductInfo] = useState<ProductInfo>()
const [sizeActive,setSizeActive] = useState<number>(0)
const [alertBox,setAlertBox] = useState<boolean>(false)
const productId:string|null = useSearchParams().get("productId")
let Sizes :string[]|undefined  = productInfo?.size

useEffect(()=>{
if(productId===null||productId==="") throw "Error : add productId"
fetch(`api/get_product_info?productId=${productId}`).then(res=>res.json()).then(res=>{setProductInfo(res)})
},[])
    return(
        <div className=" flex flex-col">
 <Navigation CatergoriesListShow={false}/>
 <ProductImage src={`/images/image_id=${productInfo?.productid}.png`}/>
<SmallProductImages src={[`/images/image_id=${productInfo?.productid}.png`]}/>
<Rating rating={productInfo?.productrating} RatingClassname="ml-[10%] mt-9 " Size="1.5rem"/>
<Title text={productInfo?.name} className="mt-3"/>
 <Discription size={productInfo?.size} brand={productInfo?.brand} catergory={productInfo?.catergory} name={productInfo?.name} color={productInfo?.color} quantity={productInfo?.stockquantity} releaseDate={productInfo?.releasedate} rating={productInfo?.productrating} price={productInfo?.price}/> 
<SizeComponent sizeActive={sizeActive} setSizeActive={setSizeActive} size={productInfo?.size}/>
<PriceText text={productInfo?.price}/>

<AddCartButton  productId={productId}  size={productInfo?.size} sizeActive={sizeActive}  setAlertBox = {setAlertBox}/>
{
  alertBox && <AlertBox title="Cart" discription="Shoe added to you cart."/>
}
<div className="h-10"></div>
<PageFooter/>

</div>
    )
}

function ProductImage({src}:{src:string}):ReactNode{
    return(
<img src={src} className="self-center w-[80%] mt-4"/>

    )
}
function SmallProductImages({src}:{src:string[]}){
return(
    <div className="self-center w-[80%] flex mt-10 gap-3 ">
        {
            src.map((value,index)=>{
                return(
                    <div key={index} className="w-[25%] border-b-2 border-primary pb-2">
<img src={value} />
                        </div>
                )
            })
        }
    </div>
)

}
function Title({text="",className}:{text?:string,className:string}):ReactNode{
    return(
            <div className={`self-center w-[80%]  ${className} `} style={{"userSelect":"none","msUserSelect":"none","WebkitUserSelect":"none"}}>
            <p className="text-[2rem] font-bold tracking-wider">{text}</p>
    </div>
    )
}
function Discription({size=[],catergory="",brand="",name="",color="",price=0,quantity=0,releaseDate="",rating=0}:{size?:string[],catergory?:string,brand?:string,name?:string,color?:string,price?:number,quantity?:number,releaseDate?:string,rating?:number}):ReactNode{
    return(
        <div className="self-center w-[80%] ">
            <p className="text-[#808080] text-xs">
            Unleash your {catergory} potential with {brand}'s {name}  a vibrant {color} mesh masterpiece designed for peak performance. Priced at Rs {price}, available in sizes {size[0]}-{size[size.length-1]}, and boasting a solid stock quantity of {quantity}, this dynamic pair is set to hit the streets on {releaseDate.substring(0,10)}, with a promising product rating of {rating}.
            </p>
        </div>
    )
}
function SizeComponent({sizeActive,setSizeActive,size=[]}:{sizeActive:number,setSizeActive:Function,size?:string[]}):ReactNode{

    const SizeContainer  = ({IndividualSize,id}:{IndividualSize:number,id:number})=>{    //   console.log(`${id} ${sizeActive}`)
    
    return(
<div onClick={()=>setSizeActive(id)} className={`w-[1.875rem] h-[1.875rem] flex items-center justify-center rounded-full bg-[#D9D9D9] ${(sizeActive===id)?"border-black border-2" :""} `}>
    <p  className={`${sizeActive===id?"font-bold":""}`} >{IndividualSize}</p>
</div>
        )
    }
    return(
        <div className="self-center w-[80%] mt-4">
            <p className="font-semibold text-[0.875rem]">Select Size</p>
         <div className="flex gap-2 mt-4">
             {
                size.map((value,index)=>{
                    return(
                        <SizeContainer key={index} IndividualSize={parseInt(value)} id={index}/>
                    )
                })
             }
         </div>   
        </div>
    )
}
function PriceText({text}:{text?:number}):ReactNode{
return(
    <div className="self-center    mt-5 w-[80%]">
        <p className="text-[2rem] font-bold">Rs {text}</p>
    </div>
)
}
function AddCartButton({productId,size,sizeActive,setAlertBox}:{productId:string|null,size?:string[],sizeActive:number,setAlertBox:Function}):ReactNode{
    return(
<button onClick={()=>AddCartMethod(productId,sizeActive,size,setAlertBox)} className="mt-[2rem] self-center w-[80%] h-fit py-4 rounded-xl bg-primary outline-none font-bold text-white">Add to Cart</button>
        )
}
async function AddCartMethod(productId:string|null,sizeActive:number,size:string[]|undefined,setAlertBox:Function){
let email = sessionStorage.getItem("email");
if(productId === null) throw "ProductId not found"
if(email === null) throw "Email is not found Please register"
if(size=== null) throw "Size not found"
let response = await    fetch("api/addCart",{
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({email:email,productId:productId,shoeSize:size?.[sizeActive]})

});
if(await response.json()==200) {
    setAlertBox(true)
setTimeout(()=>{
    setAlertBox(false)
},3000)
}
}