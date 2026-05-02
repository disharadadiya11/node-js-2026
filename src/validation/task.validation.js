const Joi = require("joi");

const createTaskSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required().messages({
    "string.empty": "Task name is required",
    "string.min": "Task name must be at least 1 character long",
    "string.max": "Task name cannot exceed 255 characters",
    "any.required": "Task name is required",
  }),
  userIds: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .min(1)
    .messages({
      "array.base": "User IDs must be an array",
      "array.min": "At least one user ID is required",
      "string.pattern.base": "Invalid user ID format",
    }),
});

const updateTaskSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).messages({
    "string.empty": "Task name cannot be empty",
    "string.min": "Task name must be at least 1 character long",
    "string.max": "Task name cannot exceed 255 characters",
  }),
  userIds: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .messages({
      "array.base": "User IDs must be an array",
      "string.pattern.base": "Invalid user ID format",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
