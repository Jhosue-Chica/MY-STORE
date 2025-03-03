const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(255);
const ruc = Joi.string().length(13);
const direccion = Joi.string();
const estado = Joi.boolean();

const createProveedorSchema = Joi.object({
  name: name.required(),
  ruc: ruc.required(),
  direccion: direccion.required(),
  estado: estado,
});

const updateProveedorSchema = Joi.object({
  name: name,
  ruc: ruc,
  direccion: direccion,
  estado: estado,
});

const getProveedorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProveedorSchema, updateProveedorSchema, getProveedorSchema };
