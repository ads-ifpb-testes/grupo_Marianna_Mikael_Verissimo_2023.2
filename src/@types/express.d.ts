type Imovel = {
  id: string,
  nome: string
  latitude: number,
  longitude: number,
  tipo: string
  descricao: string,
  preco: number,
  disponivel: boolean
  avaliacao: number
  numInquilinos: number
}

type Usuario = {
    id: string,
  nome: string,
  username: string,
  senha: string,
  telefone: string,
  email: string
}

type Imagens = {
    nomeImagem: string
}

declare namespace Express{
    export interface Request{
        user: Usuario;
    }
}