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
    imagens?: Imagens[];
  }
  