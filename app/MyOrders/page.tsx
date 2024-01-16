"use client"
import { ReactNode, useEffect, useState } from "react";
import Navigation from "../_component/navigation/layout";
import { useRouter } from "next/navigation";


interface cartInfo {
    size: number;
    productid: number;
    name: string;
    price: string;
    status:string;
}
export default function Page(): ReactNode {
    const [products, setProducts] = useState<cartInfo[]>([])

    useEffect(() => {
        let email = sessionStorage.getItem("email")
        fetch("api/get_orders", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })

        }).then(res => res.json()).then((res) => { setProducts(res); })

    }, [])
    return (
        <div className="w-full h-full flex flex-col lg:gap-4">
            <Navigation CatergoriesListShow={false} />
<CartsPageContent products={products} setProducts={setProducts}/>
        </div>
    )
}

function CartsPageContent({ products,setProducts }: { products: cartInfo[],setProducts:Function }):ReactNode {
    return(
        <div className="h-full lg:w-[80%] self-center  flex flex-col gap-5">
            <Title value="My orders"/>
            <CartsList products={products} setProducts={setProducts}/>
        </div>
   
    )
}
function CartsList({ products,setProducts }: { products: cartInfo[],setProducts:Function }) {
    if (products.length === 0)
        return (<div className="w-full h-full flex items-center justify-center">
            <p className="text-xl font-semibold">No Orders</p>
        </div>)


    return (
        <div className="w-full lg:w-[80%] flex flex-col self-center lg:gap-2">
            {
            products.map((value, index) => {
                return (
                    <OrderCards key={index} info={value} index={index} setProducts={setProducts} />
                )
            })
            }
        </div>
    )
}
function OrderCards({ info, index, setProducts }: { info: cartInfo, index: number, setProducts: Function }): ReactNode {
  const router = useRouter()
    return (

        <div className="p-2 cursor-pointer lg:border lg:rounded lg:shadow" >
            <div className="w-full grid  grid-cols-[1fr_2fr] lg:grid-cols-[9.4rem_1fr] gap-x-3 " >
                <div className="w-[9.4rem] h-[8rem] p-5 bg-card_background rounded-xl flex items-center justify-center" onClick={()=>router.push(`/ProductPage?productId=${info.productid}`)    }><img src={`/images/image_id=${info.productid}.png`} className="w-fit h-fit " alt={`${info.productid}`} /></div>
                <div className="w-full flex-1 flex flex-col justify-center" onClick={()=>router.push(`/ProductPage?productId=${info.productid}`)    }>
                    <p className="font-medium">{info.name}</p>
                    <p><span className="font-medium">Size</span>: {info.size}</p>
                    <p><span className="font-medium">Price</span>: ₹{info.price}</p>
                    <p><span className="font-medium">Status</span>: {info.status}</p>

                </div>
              
            </div>
        </div>
    )
}

function Title({value}:{value:string}) {
    return             <p className="ml-3 mt-1  text-2xl tracking-wide font-semibold">{value}</p>

}

