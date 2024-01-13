import { error } from "console";
import { NextApiResponse,NextApiRequest } from "next";
import { Elsie_Swash_Caps } from "next/font/google";
import {Pool} from "pg";
import { Result } from "postcss";
import errorCode from "@/app/Error/errorCode";
import db from "../_util/db";
export async function POST(request:Request){
let RequestData = await request.json()
console.log("check")
try{
let responese = await DB(RequestData.email,RequestData.password,RequestData.name);

}catch(error:any){
  return new Response(error.code)


}
return new Response("200")

}

async  function DB(email:string,password:string,name:string){
const conn:Pool = db()
// conn.query("CREATE TABLE IF NOT EXIST users(id INTEGER AUTOINCREMENT PRIMARY KEY,email TEXT,password TEXT,name TEXT);");
let responese =  await conn.query(`insert into users(name,email,password) values('${name}','${email}','${password}');`)

conn.end()
return responese

}


