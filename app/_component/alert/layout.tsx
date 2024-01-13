
import { ShoppingCart } from "lucide-react";
export default function AlertBox({title,discription}:{title:string,discription:string}) {
    return (
      <div className=" fixed bottom-[0px] flex  bg-white w-full gap-3 p-5 shadow lg:w-fit lg:p-5 lg:left-[.7rem] lg:bottom-2">
       
            <div className="">
                <ShoppingCart className="h-4 w-4" />
            </div>
        <div className="flex flex-col ">
                <p className="font-semibold">{title}</p>
                <p>
            {discription}
            </p>       
        </div>
       
     
      </div>
    )
}