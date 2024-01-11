import { ReactNode } from "react";

export default function Rating({rating=0,RatingClassname="",Size="1rem"}:{rating?:number,RatingClassname?:string,Size?:string}):ReactNode{
    let array = []
    for(let x:number = 0;x<rating;x++){
    array.push(x);
    }
    return(
        <div className="flex  gap-0">
            {
            array.map((value,index)=>{
            return <span key={index} className={`material-symbols-rounded ${RatingClassname}`} style={{fontVariationSettings:"'FILL' 1 ",fontSize:Size}}>
            star
            </span>}
     
    )
    }
        </div>
    )
    }