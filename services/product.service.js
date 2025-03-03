const boom = require('boom');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category', 'discount'],
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category', 'discount'],
    });

    if (!product) {
      throw boom.notFound('Product not found');
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
