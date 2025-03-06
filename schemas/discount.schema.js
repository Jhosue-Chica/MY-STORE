const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(50);
const percentage = Joi.number().integer().min(1).max(100);
const start_date = Joi.date();
const end_date = Joi.date();
const status = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createDiscountSchema = Joi.object({
  name: name.required(),
  percentage: percentage.required(),
  start_date: start_date.required(),
  end_date: end_date.required(),
  status: status.default(true)
}).custom((obj, helpers) => {
  if (new Date(obj.start_date) >= new Date(obj.end_date)) {
    return helpers.message('La fecha de inicio debe ser anterior a la fecha de fin');
  }
  return obj;
});

const updateDiscountSchema = Joi.object({
  name: name,
  percentage: percentage,
  start_date: start_date,
  end_date: end_date,
  status: status
}).custom((obj, helpers) => {
  if (obj.start_date && obj.end_date) {
    if (new Date(obj.start_date) >= new Date(obj.end_date)) {
      return helpers.message('La fecha de inicio debe ser anterior a la fecha de fin');
    }
  }
  return obj;
});

const getDiscountSchema = Joi.object({
  id: id.required(),
});

const queryDiscountSchema = Joi.object({
  limit,
  offset,
  status
});

module.exports = {
  createDiscountSchema,
  updateDiscountSchema,
  getDiscountSchema,
  queryDiscountSchema,
};
