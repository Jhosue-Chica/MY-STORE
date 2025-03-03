const boom = require('boom');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rst = await models.User.findAll({
      include: ['customer'],
    });
    return rst;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    } else {
      await user.destroy();
      return { id };
    }
  }
}

module.exports = UserService;
