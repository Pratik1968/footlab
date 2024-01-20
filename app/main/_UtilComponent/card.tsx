
import Rating from "@/app/_componentUtil/ratingComponent";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
export default function Card({productId,className,ImageClassName="",TitleClassname,PriceClassname,RatingClassname,src,alt,title,price,rating}:{productId:number,className:string,ImageClassName?:string,TitleClassname?:string,PriceClassname?:string,RatingClassname?:string,src:string,alt:string,title:string,price:number,rating:number}):ReactNode{
    const router = useRouter()
const [isClicked,setIsClick] = useState(false)
   
            const handleClick=()=>{
                    router.push(`/ProductPage?productId=${productId}`)
            }
    
  
    return(

    <div  className={`cursor-pointer  ${className}`} onClick={()=>handleClick()}>
        <ProductImage ImageClassname={ImageClassName} src={src} alt={alt}/>
           <Content title={title} price={price} rating={rating} TitleClassname={TitleClassname} PriceClassname={PriceClassname} RatingClassname={RatingClassname} />
    
    </div>

    )
}
function Content({TitleClassname,PriceClassname,RatingClassname, title,price,rating}:{TitleClassname?:string,PriceClassname?:string,RatingClassname?:string,title:string,price:number,rating:number,}):ReactNode{
    return(<div >
    
            <Title title={title} TitleClassName={TitleClassname}/>
                <Price price={price} PriceClassname={PriceClassname}/>
       
            <Rating rating={rating} RatingClassname={RatingClassname}/>
    </div>
    )
}
function Title({title,TitleClassName=""}:{title:string,TitleClassName?:string}):ReactNode{
    return <p className={`font-bold tracking-wider text-sm ${TitleClassName}`}>{title}</p>
}
function Price({price,PriceClassname=""}:{price:number,PriceClassname?:string}):ReactNode{
return <p className={`text-sm ${PriceClassname}`}>Rs {price}</p>
}

function ProductImage({ImageClassname,src,alt}:{ImageClassname:string,src:string,alt:string}):ReactNode{
    return(
        <div className={`bg-card_background rounded-t-2xl mb-2 min-h-[70%] w-full flex items-center justify-center ${ImageClassname}`}>
            <Image width={300} height ={300} src={src}  alt={alt} className="w-[70%] "/>
        </div>
    )
}