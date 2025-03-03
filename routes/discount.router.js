const express = require('express');

const DiscountService = require('../services/discount.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createDiscountSchema,
  updateDiscountSchema,
  getDiscountSchema,
} = require('../schemas/discount.schema');

const router = express.Router();
const service = new DiscountService();

router.get('/', async (req, res, next) => {
  try {
    const discounts = await service.find();
    res.json(discounts);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getDiscountSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const discount = await service.findOne(id);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createDiscountSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDiscount = await service.create(body);
      res.status(201).json(newDiscount);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getDiscountSchema, 'params'),
  validatorHandler(updateDiscountSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const discount = await service.update(id, body);
      res.json(discount);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getDiscountSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
