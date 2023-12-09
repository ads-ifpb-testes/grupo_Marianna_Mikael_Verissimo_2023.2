import { Imovel } from "../model/Imovel";
import { Usuario } from "../model/Usuario"
import { Imagem } from "../model/Imagem"
import express from "express";
  
declare global {
  namespace Express {
    export interface Request {
      user_id?: Usuario.id;
    }
  }
}
