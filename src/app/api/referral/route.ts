import client from "../../../lib/mongo";
import { Db, Document, InsertOneResult, WithId } from "mongodb";
import { User } from "@/app/signup/page";
import { REFERRAL_BONUS_REFERRED_PERSON, REFERRAL_BONUS_REFERREE } from "@/lib/CONSTANTS";

interface ReferralUpdate {
    id_referred : string,
    id_referee : string
}

export async function PUT(request: Request) {
    try{
        const data : ReferralUpdate = await request.json();

        try{
            await client.connect();

            const db: Db = client.db("DailySAT");

            // check if the referee exists
            const doc_check : WithId<Document> | null = await db.collection("users").findOne({$where : {id : data.id_referee}})

            if(doc_check == null){
                return Response.json({
                    code : 200,
                    result : 0,
                    message : "invalid referral code"
                })
            }
            else{
                await db.collection("users").findOneAndUpdate({$where:{id : data.id_referred}}, {$inc : {currency : REFERRAL_BONUS_REFERRED_PERSON}});
                await db.collection("users").findOneAndUpdate({$where:{id : data.id_referee}}, {$inc : {currency : REFERRAL_BONUS_REFERREE}});
                
                return Response.json({
                    code : 200,
                    message : "updated"
                })
            }
        }

        catch{
            return Response.json({
                code : 500,
                message : "error in connecting with the mongodb client"
            })
        }
    }
    catch{
        return Response.json({
            code : 400,
            message : "error in reading request JSON : give referral data in proper format"
        })
    }
}
