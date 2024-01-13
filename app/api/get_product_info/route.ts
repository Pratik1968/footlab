import { useSearchParams } from "next/navigation"
import { Pool } from "pg"
import db from "../_util/db"

export async function GET(request:Request){
const productId = new URLSearchParams(new URL(request.url).searchParams).get("productId") 
try{
    let responese = await DB(parseInt(productId!))
    return new Response(JSON.stringify(responese))

}catch(err){
    return new Response('404')

}
return new Response("200")
}
async  function DB(productId:number){
    const conn:Pool = db()
   const query = `select * from ShoeProduct where productid=${productId};`
   let responese =  await conn.query(query)
    
    conn.end()
    return responese.rows[0]
    
    }