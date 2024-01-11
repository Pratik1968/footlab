import { Pool } from "pg";

export default function db(){
 return(
 new Pool({
        user: process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB,
        password:process.env.DB_PASSWORD,
        port:parseInt(process.env.DB_PORT!),
      }) 
 )   
} 