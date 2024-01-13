import { ReactNode } from "react";

 export default function PageFooter():ReactNode{
return(
    <footer className="flex flex-col items-center justify-center gap-5  ">
        <hr className="w-full"/>
        <p >Made by <span className="font-semibold">Pratik Shekhar</span></p>
    </footer>
)
}