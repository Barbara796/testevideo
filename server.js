const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Caminho original do db.json
const dbPath = path.join(__dirname, 'db.json');

// Caminho temporário em /tmp
const tmpDbPath = path.join('/tmp', 'db.json');

// Copiar o db.json para o diretório temporário (se ainda não existir)
if (!fs.existsSync(tmpDbPath)) {
  fs.copyFileSync(dbPath, tmpDbPath);
  console.log('Arquivo db.json copiado para /tmp');
}

// Função para carregar os dados do db.json em /tmp
const loadData = () => {
  const rawData = fs.readFileSync(tmpDbPath, 'utf-8');
  return JSON.parse(rawData);
};

const router = jsonServer.router(loadData()); // Inicializa o router com os dados em memória

server.use(middlewares);
server.use(router);

module.exports = server;
