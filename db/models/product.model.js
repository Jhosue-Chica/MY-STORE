const { Sequelize, Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const { DISCOUNT_TABLE } = require('./discount.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category_id',
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  discount_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'discount_id',
    references: {
      model: DISCOUNT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsTo(models.Discount, {
      foreignKey: 'discount_id',
      as: 'discount'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, Product, ProductSchema };
