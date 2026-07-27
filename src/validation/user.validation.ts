import Joi from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name cannot exceed 30 characters",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Please provide a valid email",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
    })
});
const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
       "any.required": "Email is required",
       "string.email": "Please provide a valid email",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
    
});


export { createUserSchema, loginUserSchema };