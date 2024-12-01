const Usuario = require('../models/usuario');

async function findAll() {
  try{
    return await Usuario.findAll();
  } catch (error) {
    throw new Error('Error fetching all users: ' + error.message);
  }
  
}

async function findById(id) {
  try{
    return await Usuario.findByPk(id);
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
}

async function create({ nome, email, senha }) {
  try{
    return await Usuario.create({ nome, email, senha });
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}



async function update(id, { nome, email, senha }) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nome = nome || usuario.nome;
      usuario.email = email || usuario.email;
      usuario.senha = senha || usuario.senha;
      await usuario.save();
      return usuario;
    }
    return null;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
}



async function remove(id) {
  try{
    const user = await Usuario.findByPk(id);
    if (user) {
      await user.destroy();
      return user;
    }
    return null;
  } catch (error) {
    throw new Error('Error removing user: ' + error.message);
  }
}


async function findByEmail(email) {
  try {
    return await Usuario.findOne({ where: { email } });
  } catch (error) {
    throw new Error('Error fetching user by email: ' + error.message);
  }
}


module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findByEmail
};
