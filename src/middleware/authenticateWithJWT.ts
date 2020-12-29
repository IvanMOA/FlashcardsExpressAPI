import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import JWK from "../jwks.json"
import jwkToPem from "jwk-to-pem"

const authenticateWithJWT =(req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization){
        return res.status(401).send()
    }
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.decode(token, {complete: true}) as AWSIDToken
    let authenticated = false
    JWK.keys.forEach(key => {
    debugger
        if(key.kid === decodedToken.header.kid) {
            // @ts-ignore
            const pem = jwkToPem(key)
            jwt.verify(token, pem, {algorithms: ["RS256"]}, (err, decoded) => {
                console.log(decoded, err);
                authenticated = true
                next()
            })
        }
    })
    if(!authenticated){
        res.status(401).send()
    }
}

export default authenticateWithJWT

