import { expressjwt } from "express-jwt";
import type { Request, Response, NextFunction } from "express"; 

function authJwt(){
    const secret = process.env.JWT_SECRET;
    if (!secret){
        throw new Error("JWT secret not found in environment variables");
    }
    const jwtMiddleware = expressjwt({
        secret,
        algorithms: ["HS256"],
    }); 
    return( req: Request, res: Response, next: NextFunction) => {
        jwtMiddleware(req, res, (err) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            next();
        });
    }
    
};

export default authJwt;