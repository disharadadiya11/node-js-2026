const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(128).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password cannot exceed 128 characters",
    "any.required": "Password is required",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Mobile number must be between 10-15 digits",
    }),
  role: Joi.string()
    .valid("user", "admin", "moderator")
    .default("user")
    .messages({
      "any.only": "Role must be one of: user, admin, moderator",
    }),
  file: Joi.any().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),
  email: Joi.string().email().trim().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email cannot be empty",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Mobile number must be between 10-15 digits",
    }),
  role: Joi.string().valid("user", "admin", "moderator").messages({
    "any.only": "Role must be one of: user, admin, moderator",
  }),
  file: Joi.any().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};
