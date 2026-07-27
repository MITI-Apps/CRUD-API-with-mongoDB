import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot exceed 30 characters"
  }),
  price: Joi.number().positive().required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity cannot be negative",
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().empty("").optional(),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

export { createProductSchema, updateProductSchema };