import { prisma } from "../database/prisma.client";
import { v4 as uuid} from "uuid";
import { Imovel } from "../model/Imovel";
import { Usuario } from "../model/Usuario";

export class ImovelHandle {
  //C
  static async create(infos: Imovel, user: Usuario) {
    const imoveis = await prisma.imovel.create({
      data: {
        id: uuid(),
        nome: infos.nome,
        latitude: infos.latitude,
        longitude: infos.longitude,
        tipo: infos.tipo,
        descricao: infos.descricao,
        preco: infos.preco,
        disponivel: infos.disponivel,
        avaliacao: infos.avaliacao,
        numInquilinos: infos.numInquilinos,
        userId: user.id
      }
    });

    return {
      status: 201,
      message: 'Imovel cadastrado com sucesso'
    }
  }
  //R
  static async list() {
    const imoveis = await prisma.imovel.findMany();
    return imoveis;
  }

  // static async findByName(nome: string) {
  //   const imovel = await prisma.imovel.findUnique({
  //     where:{
  //       nome
  //     }
  // })
  // }
  //U
  //D
}