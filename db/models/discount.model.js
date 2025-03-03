const { Sequelize, Model, DataTypes } = require('sequelize');

const DISCOUNT_TABLE = 'discounts';

const DiscountSchema = {
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
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100
    }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date'
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date'
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.literal('NOW()'),
  }
};

class Discount extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'discount_id',
      as: 'products'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DISCOUNT_TABLE,
      modelName: 'Discount',
      timestamps: false,
    };
  }
}

module.exports = { DISCOUNT_TABLE, Discount, DiscountSchema };
