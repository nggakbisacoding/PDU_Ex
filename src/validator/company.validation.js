import Joi from "joi";

const registerCompanyValidation = Joi.object({
  name: Joi.string().max(100).required(),
  address: Joi.string().max(400).required(),
});

const updateCompanyValidation = Joi.object({
  id: Joi.string().max(50).required(),
  name: Joi.string().max(100).optional(),
  address: Joi.string().max(400).optional(),
});

const deleteCompanyValidation = Joi.object({
  id: Joi.string().max(50).required(),
});

export {
  registerCompanyValidation,
  updateCompanyValidation,
  deleteCompanyValidation,
};
