import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";

function validate(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            const messages = error.details.map((detail) => detail.message);
            return res.status(400).json({ errors: messages });
        }

        req.body = value;
        next();
    };
}

export default validate;