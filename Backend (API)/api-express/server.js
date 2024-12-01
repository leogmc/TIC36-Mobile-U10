const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const usuariosRoutes = require('./routes/usuarios');
const vagasRoutes = require('./routes/vagas');

const Usuario = require('./models/usuario'); 
const Vaga = require('./models/vaga');      

const app = express();
app.use(bodyParser.json());


// Function to seeding database (only used in tests)
async function seedDatabase() {
  const usuariosExistentes = await Usuario.findAll();
  if (usuariosExistentes.length === 0) {
    await Usuario.bulkCreate([
        {
   
        nome: "João Silva",
        email: "joao.silva@example.com",
        senha: "senha123"
      },
      {
  
        nome: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        senha: "senha456"
      },
      {

        nome: "Carlos Pereira",
        email: "carlos.pereira@example.com",
        senha: "senha789"
      }
    ]);
    console.log('Usuários iniciais criados');
  }

  const vagasExistentes = await Vaga.findAll();
  if (vagasExistentes.length === 0) {
    await Vaga.bulkCreate([
      {

        titulo: "Desenvolvedor Front-end",
        descricao: "Desenvolvimento de interfaces web utilizando React.",
        dataCadastro: "2024-06-30",
        telefone: "1234-5678",
        status: "aberta",
        empresa: "Tech Solutions"
      },
      {
  
        titulo: "Desenvolvedor Back-end",
        descricao: "Desenvolvimento de APIs RESTful utilizando Node.js.",
        dataCadastro: "2024-06-28",
        telefone: "8765-4321",
        status: "aberta",
        empresa: "Innovative Tech"
      },
      {

        titulo: "Analista de Sistemas",
        descricao: "Análise e levantamento de requisitos de sistemas.",
        dataCadastro: "2024-06-25",
        telefone: "9988-7766",
        status: "encerrada",
        empresa: "System Analysts Inc."
      },
      {

        titulo: "Engenheiro de Software",
        descricao: "Desenvolvimento de software em diversas linguagens.",
        dataCadastro: "2024-06-20",
        telefone: "5544-3322",
        status: "aberta",
        empresa: "Global Software Solutions"
      },
      {

        titulo: "Suporte Técnico",
        descricao: "Atendimento e suporte a clientes.",
        dataCadastro: "2024-06-15",
        telefone: "4433-2211",
        status: "encerrada",
        empresa: "Customer Support Ltd."
      },
      {

        titulo: "Gerente de Projetos",
        descricao: "Gestão e coordenação de projetos de TI.",
        dataCadastro: "2024-06-10",
        telefone: "1122-3344",
        status: "aberta",
        empresa: "Project Managers Corp."
      },
      {
        titulo: "Designer UX/UI",
        descricao: "Criação de interfaces e experiências de usuário.",
        dataCadastro: "2024-06-05",
        telefone: "6677-8899",
        status: "encerrada",
        empresa: "Creative Designs"
      },
      {
   
        titulo: "Analista de Dados",
        descricao: "Análise e interpretação de dados empresariais.",
        dataCadastro: "2024-06-01",
        telefone: "5566-7788",
        status: "aberta",
        empresa: "Data Analysts LLC"
      }
    ]);
    console.log('Vagas iniciais criadas');
  }
}


// Synchronizing database
sequelize
  .sync()
  .then(async() => {
      console.log('Database synchronized');
      await seedDatabase();
  }).catch(err => {
      console.error('Unable to synchronize the database:', err);
});

// Using imported routes
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/vagas', vagasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
