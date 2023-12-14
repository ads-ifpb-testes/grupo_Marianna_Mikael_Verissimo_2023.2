import request from 'supertest';
import { app, server } from "../server"
import { v4 as uuid } from "uuid";
import validateImovel from '../middlewares/validateImovel';

describe('Testando validação', () => {
  it('deve chamar validateImovel.new corretamente', async () => {
    const resp = await request(app)
      .post('/imoveis')
      .send({
        id: uuid(),
        nome: "apto 104",
        latitude: -6.87,
        longitude: 38.58,
        tipo: "apto",
        descricao: "asdfoitrcvbnm",
        preco: 7000,
        disponivel: true,
        avaliacao: 4,
        numInquilinos: 2
      });

    expect(validateImovel.new).toHaveBeenCalledWith();
  });
});
