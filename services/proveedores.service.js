const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize'); // Importa sequelize para ejecutar consultas SQL

class ProveedoresService {
  async create(data) {
    const { name, ruc, direccion, estado } = data;
    const query = `
      INSERT INTO proveedores (name, ruc, direccion, estado)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const [newProveedor] = await sequelize.query(query, {
      bind: [name, ruc, direccion, estado],
    });
    return newProveedor;
  }

  async find() {
    const query = 'SELECT * FROM proveedores;';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = 'SELECT * FROM proveedores WHERE id = $1;';
    const [proveedor] = await sequelize.query(query, {
      bind: [id],
    });

    if (proveedor.length === 0) {
      throw boom.notFound('Proveedor no encontrado');
    }
    return proveedor[0];
  }

  async update(id, changes) {
    // 1. Obtener los campos que se van a actualizar
    const fieldsToUpdate = Object.keys(changes);
    if (fieldsToUpdate.length === 0) {
      throw boom.badRequest('No se proporcionaron datos para actualizar');
    }

    // 2. Construir la parte SET de la consulta SQL dinámicamente
    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');

    // 3. Construir la consulta SQL completa
    const query = `
      UPDATE proveedores
      SET ${setClause}
      WHERE id = $${fieldsToUpdate.length + 1}
      RETURNING *;
    `;

    // 4. Preparar los valores para los parámetros
    const values = fieldsToUpdate.map((field) => changes[field]);
    values.push(id); // Agregar el ID al final de los valores

    // 5. Ejecutar la consulta
    const [updatedProveedor] = await sequelize.query(query, {
      bind: values,
    });

    if (updatedProveedor.length === 0) {
      throw boom.notFound('Proveedor no encontrado');
    }

    return updatedProveedor[0];
  }

  async delete(id) {
    const query = 'DELETE FROM proveedores WHERE id = $1 RETURNING id;';
    const [deletedProveedor] = await sequelize.query(query, {
      bind: [id],
    });

    if (deletedProveedor.length === 0) {
      throw boom.notFound('Proveedor no encontrado');
    }
    return { id: deletedProveedor[0].id };
  }
}

module.exports = ProveedoresService;
