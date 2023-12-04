import { Imagem } from "./Imagem";
export type Imovel = {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    tipo: string;
    descricao: string;
    preco: number;
    disponivel: boolean;
    numInquilinos: number;
  }
  
  export interface ImovelDTO extends Imovel {
    imagens?: Imagem[];
  }