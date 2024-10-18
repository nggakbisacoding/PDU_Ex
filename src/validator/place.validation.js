import Joi from "joi";

const registerPlaceValidation = Joi.object({
  companyId: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  address: Joi.string().max(400).required(),
  latitude: Joi.number(),
  longitude: Joi.number(),
});

const updatePlaceValidation = Joi.object({
  companyId: Joi.string().max(50).required(),
  id: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  address: Joi.string().max(400).required(),
  latitude: Joi.number(),
  longitude: Joi.number(),
});

const deletePlaceValidation = Joi.object({
  companyId: Joi.string().max(50).required(),
  id: Joi.string().max(50).required(),
});

export {
  registerPlaceValidation,
  updatePlaceValidation,
  deletePlaceValidation,
};
