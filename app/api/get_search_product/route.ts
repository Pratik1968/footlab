import { Pool } from "pg"
import db from "../_util/db"

export async function POST(request:Request){
    const RequestData = await request.json()
    const text:string = RequestData.text
try{
    const response = await DB(text)
    return new Response(JSON.stringify(response))
}catch(error){
throw error
}
   
}
async function DB(text:string){
const conn:Pool = db()
text +="%"
const result = await conn.query("select productid,name,price,productrating from shoeproduct where lower(name) like lower($1);",[text])
conn.end()
return result.rows

}