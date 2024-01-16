import { Pool, Query, QueryResult } from "pg"
import db from "../_util/db"
interface cartInfo {
  size: number;
  productid: number;
  name: string;
  price: string;
}
export async function POST(request:Request){
   const RequestData = await request.json()
   let email = RequestData.email
   let index = RequestData.index
   try{

       let responese = await DB(email,index);
       console.log(responese)
       return new Response(JSON.stringify(responese))
   }
   catch(error){
throw error;
}

}

async function DB(email:string,index:number){
  const conn:Pool = db()
  let query = `update carts set productIds = ( select productids::jsonb -${index}  as productids  from carts where email= '${email}') where email ='${email}';
   SELECT   (element->>'size')::int AS size, (element->> 'productId')::int AS productid 
  ,shoeproduct.name ,shoeproduct.price  FROM carts, jsonb_path_query(productids, '$[*]') AS element
  JOIN shoeproduct ON shoeproduct.productid = (element->> 'productId')::int  
  WHERE email='${email}';`
  const  Response:any=  await conn.query(query)
  conn.end()
  return Response[1].rows

}