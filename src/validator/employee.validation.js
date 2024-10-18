import Joi from "joi";

const registerEmployeeValidation = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .message(
      '"{#label}" harus terdiri dari setidaknya 6 karakter dengan minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol'
    )
    .required(),
  confirmPassword: Joi.ref("password"),
});

const addEmployeeValidation = Joi.object({
  companyId: Joi.string().max(50).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  //password minimum one number, one lowercase and one uppercase letter, at least six characters
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .message(
      '"{#label}" harus terdiri dari setidaknya 6 karakter dengan minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol'
    )
    .required(),
  confirmPassword: Joi.ref("password"),
});

const loginEmployeeValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().required(),
});

const updateEmployeeValidation = Joi.object({
  id: Joi.string().max(50).required(),
  name: Joi.string().max(100),
  email: Joi.string().max(100),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .message(
      '"{#label}" harus terdiri dari setidaknya 6 karakter dengan minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol'
    ),
  confirmPassword: Joi.ref("password"),
});

const deleteEmployeeValidation = Joi.object({
  id: Joi.string().max(50).required(),
});

export {
  registerEmployeeValidation,
  addEmployeeValidation,
  loginEmployeeValidation,
  updateEmployeeValidation,
  deleteEmployeeValidation,
};
