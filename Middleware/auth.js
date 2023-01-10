
import jwt from "jsonwebtoken";

export  default function Auth (request,response,next){
    try{
    const token=request.header("x-auth-token");
    console.log(token);
    jwt.verify(token,process.env.SECRET_KEY);
    next();}
    catch(err){
        response.status(401).send({error:err.message});
    }
}