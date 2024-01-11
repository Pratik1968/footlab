import { ReactNode } from "react";

export default function Title({title,subtitle}:{title:string,subtitle:string}):ReactNode{
    return(
        <div className="w-full flex flex-col items-center mb-14">
            <p className="text-3xl font-extrabold">{title}</p>
            <p className="tracking-[0.1rem]">{subtitle}</p>
        </div>
    )
} 