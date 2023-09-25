import jwt from "jsonwebtoken"

export const authenticationCheck=(req,res,next)=>{
    const auth=req.headers.authorization;
    if(auth === undefined){
        res.status(401).send({
            "status":0,
        });
        return
    }
    const authSplit=auth.split(" ");
    if(authSplit.length < 2){
        res.status(401).send({
            "status":0
        });
        return
    }
    const token=authSplit[1]
    jwt.verify(token,'secretKey',(err,decoded)=>{
        if(err){
            res.status(401).send({
                "status":0,
                "message":err
            })
            return
        }
        res.locals.user=decoded
        next()
    });
}