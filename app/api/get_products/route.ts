import { Pool } from "pg"
import { resourceUsage } from "process"
import db from "../_util/db";
interface queryInfo{
   from:number,
   to:number
}

export async function POST(request:Request){
   try{
      const RequestData = await request.json() as queryInfo;
    return new Response(JSON.stringify(await DB(RequestData.from,RequestData.to)))
   }catch(err:any){
return new Response("404")
   }
}
async  function DB(from:number,to:number){
    const conn:Pool = db()
   const query = `select productid,name,price,productrating  from ShoeProduct where productid>=${from} and productid<=${to};`
   let responese =  await conn.query(query)
    
    conn.end()
    return responese.rows
    
    }