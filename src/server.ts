const express = require('express');
const { routes } = require('./routes');

export type Imovel = {
    id: string;
  nome: string;
  latitude: number;
  longitude: number;
  tipo: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  avaliacao: number;
  numInquilinos: number;
  imagens: Imagens[];
}

export type Usuario = {
    id: string;
  nome: string;
  username: string;
  senha: string;
  telefone: string;
  email: string;
}

export type Imagens = {
    nomeImagem: string;
}

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () =>{
    console.log('Server online on port 3000');
})