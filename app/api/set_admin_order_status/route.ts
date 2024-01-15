import { Pool } from "pg"
import db from "../_util/db"

export async function POST(request: Request) {
    const RequestData = await request.json()
    const id = RequestData.id
    const selected = RequestData.selected
    try { 
        let responses = DB(id, selected)
    return new Response(JSON.stringify("200"))
    } 
    catch (error) {

        throw error;
    }
    
}
async function DB(id: string, selected: string) {
    const conn: Pool = db()
    let responese = await conn.query("update shoeorder set status = $1 where id =$2;", [selected, id])
    return(responese.rowCount)
}