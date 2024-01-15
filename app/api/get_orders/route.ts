
import { Pool } from "pg";
import { emit } from "process";
import db from "../_util/db";

export async function POST(request: Request) {
    const RequestData = await request.json()
    try {
        let responese = await DB(RequestData.email)

        return new Response(JSON.stringify(responese))
    }
    catch (error: any) {
        throw error
        return new Response(error.code)

    }


}
async function DB(email: string) {

    const conn: Pool = db()
    let query = `
   SELECT   (element->>'size')::int AS size, (element->> 'productId')::int AS productid,shoeproduct.name as name,shoeproduct.price as price,status  FROM shoeorder, jsonb_path_query(productids, '$[*]') AS element JOIN shoeproduct ON shoeproduct.productid = (element->> 'productId')::int WHERE email='${email}';                                                                                                                                                                     `;
    let responese = await conn.query(query)
    return responese.rows

}