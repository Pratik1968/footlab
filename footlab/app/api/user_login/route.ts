import { error } from "console"
import { Pool } from "pg"
import db from "../_util/db"

export async function POST(request:Request){

    
    try{
        const RequestData = await request.json()

let    result = await  DB(RequestData.email,RequestData.password)
if(result.length===1){
    return new Response(JSON.stringify({code:200,name:result[0].name}))
}
}catch(error:any){
    throw error
}
return new Response("404")
}
async  function DB(email:string,password:string){
  
    const conn:Pool = db()
    // conn.query("CREATE TABLE IF NOT EXIST users(id INTEGER AUTOINCREMENT PRIMARY KEY,email TEXT,password TEXT,name TEXT);");
   let query = `select * from users  where email ='${email}'  and password = '${password}';`;
   let responese =  await conn.query(query)
    return responese.rows
    
    }