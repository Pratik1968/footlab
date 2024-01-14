"use client"
import { ReactNode, useEffect, useState } from "react";
import ProductInfo from "../main/UtilFunction/ProductInfo";
import errorCode from "../Error/errorCode";
import { X } from "lucide-react";
import Navigation from "../_component/navigation/layout";
import { time } from "console";
import { useRouter } from "next/navigation";

interface cartInfo {
    size: number;
    productid: number;
    name: string;
    price: string;
}
export default function Carts(): ReactNode {
    const [products, setProducts] = useState<cartInfo[]>([])

    useEffect(() => {
        let email = sessionStorage.getItem("email")
        fetch("api/get_carts", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })

        }).then(res => res.json()).then((res => { setProducts(res); }))

    }, [])
    return (
        <div className="flex flex-col">
            <Navigation CatergoriesListShow={false} />
            <div className="h-5"></div>
<CartsPageContent products={products} setProducts={setProducts}/>
<BuyButton/>
        </div>
    )
}

function CartsPageContent({ products,setProducts }: { products: cartInfo[],setProducts:Function }):ReactNode {
    return(
        <div className="self-center lg:w-[80%] flex flex-col">
            <Title value="Carts"/>
            <div className="h-5"></div>
            <CartsList products={products} setProducts={setProducts}/>
        </div>
   
    )
}
function CartsList({ products,setProducts }: { products: cartInfo[],setProducts:Function }) {
    if (products.length === 0)
        return (<div className="w-full h-full flex items-center justify-center">
            <p className="text-xl font-semibold">No carts</p>
        </div>)


    return (
        <div className="w-full lg:w-[80%] flex flex-col self-center lg:gap-2">
            {
            products.map((value, index) => {
                return (
                    <CartCards key={index} info={value} index={index} setProducts={setProducts} />
                )
            })
            }
        </div>
    )
}
function CartCards({ info, index, setProducts }: { info: cartInfo, index: number, setProducts: Function }): ReactNode {
   const router = useRouter()
    return (

        <div className="p-2 cursor-pointer" onClick={()=>router.push(`/ProductPage?productId=${info.productid}`)    }>
            <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-3 my-2">
                <div className="w-[7.89rem] h-[6.7rem] p-5 bg-card_background rounded-xl flex items-center justify-center"><img src={`/images/image_id=${info.productid}.png`} className="w-fit h-fit " alt={`${info.productid}`} /></div>
                <div className="flex flex-col justify-center">
                    <p className="font-medium">{info.name}</p>
                    <p><span className="font-medium">Size</span>: {info.size}</p>
                    <p><span className="font-medium">Price</span>: ₹{info.price}</p>
                </div>
                <div className="flex items-center justify-center p-5">
                    <X onClick={() => deleteProduct(index, setProducts)} className="cursor-pointer" />
                </div>
            </div>
        </div>
    )
}
function deleteProduct(index: number, setProducts: Function) {
    let email = sessionStorage.getItem("email")
    fetch("api/delete_cart_product", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, index: index })
    }).then(
        res => res.json()
    ).then(
        res => setProducts(res)
    )
}
function Title({value}:{value:string}) {
    return             <p className="ml-3 mt-1 text-2xl tracking-wide font-semibold">{value}</p>

}

function BuyButton():ReactNode {
    const router= useRouter()
    return(
<div className="fixed bottom-5 left-0 right-0 flex items-center justify-center"><button className="w-[75%] lg:w-[15%] bg-primary py-4  text-secondary font-bold rounded-xl" onClick={()=>router.push("/addAddresses")}>Buy</button></div>
        )
}