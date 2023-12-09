import { Imovel } from "../model/Imovel";
import { Usuario } from "../model/Usuario"
import { Imagem } from "../model/Imagem"

declare namespace Express {
  export interface Request {
    user: Usuario,
    imovel: Imovel,
  }
}