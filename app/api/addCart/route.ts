import { Ewert } from "next/font/google"
import { Pool } from "pg"
import db from "../_util/db"

export async function POST(request:Request) {
    const RequestData = await request.json()
const email =  RequestData.email
const productId = RequestData.productId
const shoeSize = RequestData.shoeSize
const responese = await DB(productId,email,shoeSize)
return new Response(responese)
}
async  function DB(productId:number,email:string,shoeSize:string){
    const conn:Pool = db()
if(await Update(conn,productId,email,shoeSize)){
    
    conn.end()
return "200"
}
if(await Insert(conn,productId,email,shoeSize)) 
{
    conn.end()
return "200"
    
    }
return "Error"
}
    async function Update(conn:Pool,productId:number,email:string,shoeSize:string) {
        const query = `update carts set productIds = productIds ||'{"productId":"${productId}","size":"${shoeSize}"}'::jsonb where email='${email}';`
let responese = await conn.query(query);
if(responese.rowCount===0) return false
return true
    }
async function Insert(conn:Pool,productId:number,email:string,shoeSize:string) {
    const query = `insert into carts values('${email}','[{"productId":${productId},"size":${shoeSize}}]');`
    let responese = await conn.query(query)
    if(responese.rowCount===1) return true
    return false
}