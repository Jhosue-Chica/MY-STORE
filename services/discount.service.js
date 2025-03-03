const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class DiscountService {
  constructor() {}

  async create(data) {
    const newDiscount = await models.Discount.create(data);
    return newDiscount;
  }

  async find() {
    const discounts = await models.Discount.findAll({
      include: ['products']
    });
    return discounts;
  }

  async findOne(id) {
    const discount = await models.Discount.findByPk(id, {
      include: ['products']
    });
    if (!discount) {
      throw boom.notFound('Discount not found');
    }
    return discount;
  }

  async update(id, changes) {
    const discount = await this.findOne(id);
    const updatedDiscount = await discount.update(changes);
    return updatedDiscount;
  }

  async delete(id) {
    const discount = await this.findOne(id);

    // Desasociar productos antes de eliminar el descuento
    await models.Product.update(
      { discount_id: null },
      { where: { discount_id: id } }
    );

    await discount.destroy();
    return { id };
  }
}

module.exports = DiscountService;
