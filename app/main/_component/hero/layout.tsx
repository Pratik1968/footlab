import { ReactNode } from "react";
import Image from "next/image"
export default function Hero():ReactNode{
    
    return(
<div className="self-center  w-full lg:w-[80%] h-fit bg-card_background">
    <Image width={300} height={100} src="/images/image_id=1.svg" alt="banner" className="w-full   h-fit  lg:h-[30rem]" /></div>
        )
}