import { Pool } from "pg"
import db from "../_util/db"
import format from "pg-format";
import errorCode from "@/app/Error/errorCode";
export async function POST(request:Request){
    const requestData = await request.json()
const email:string = requestData.email
const addresses = requestData.address

try{
let response = await DB(email,addresses)  
return new Response(response)  
}
catch(error){
    throw error
} 

}
async function DB(email:string,addresses:any){
    const conn:Pool = db()
 const result =  await conn.query(`select productids from carts where email ='${email}';`);
 if(result.rowCount ===0) return errorCode.CartEmpty
const  productids = result.rows[0].productids
let address:string =""
for (const item in addresses){
    address+=" "+addresses[item]
}
 if(result!= null){
    const deleteResult = await conn.query(` delete from carts where email ='${email}';`)

    await InsertIntoOrder(conn,email,productids,address)
conn.end()
}
return "200"
}
async function InsertIntoOrder(conn:Pool,email:string,productIds:JSON,address:string,status:string="Pending"){
    const  resultInsert = await conn.query(`INSERT INTO shoeorder VALUES($1,$2,$3 , $4);`,[email,`[${format.string(productIds)}]`,address,"Pending"],)
    
}