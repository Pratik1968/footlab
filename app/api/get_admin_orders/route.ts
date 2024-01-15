import { Pool } from "pg"
import db from "../_util/db"

export async function GET(request:Request){
 const responese = await DB()
 
    return new Response(JSON.stringify(responese))
} 

export async function DB(){
    const conn: Pool = db()
    const response = await conn.query(`
    select id,email,address,status,json_agg(jsonb_build_object(
        'productid',arr.item_object->>'productId',
        'name',(select name from shoeproduct where productid::text =arr.item_object->>'productId'),
        'price',(select price from shoeproduct where productid::text =arr.item_object->>'productId'),
        'size',arr.item_object->>'size'
        )) as productids from shoeorder,jsonb_array_elements(productids) with ordinality arr(item_object, position)
        GROUP by id order by id
        ;
    `)
return  response.rows
}











