import { error } from "console"
import { Pool } from "pg"
import db from "../_util/db"

export async function POST(request:Request){
const RequestData = await request.json()
const email = RequestData.email
const password = RequestData.password

const admin_email = process.env.ADMIN_EMAIL
const admin_password = process.env.ADMIN_PASSWORD
if(email===admin_email && password===admin_password) return new Response("200")
else return new Response("404")

 
}
