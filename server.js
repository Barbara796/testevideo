const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Função para carregar os dados do db.json em memória
const loadData = () => {
  const dbPath = path.join(__dirname, 'db.json'); // Caminho para db.json
  const rawData = fs.readFileSync(dbPath, 'utf-8'); // Lê o conteúdo do arquivo
  return JSON.parse(rawData); // Converte o conteúdo em objeto JSON
};

const router = jsonServer.router(loadData()); // Carrega os dados em memória

server.use(middlewares);
server.use(router);

module.exports = server;
