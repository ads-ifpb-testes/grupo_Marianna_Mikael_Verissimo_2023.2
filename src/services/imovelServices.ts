import { prisma } from "../database/prisma.client";
import { v4 as uuid } from "uuid";
import { Imovel } from "../model/Imovel";
import { Usuario } from "../model/Usuario";
import { Coordinates } from "../model/Imovel";

export class ImovelHandle {
  //C
  static async create(infos: Imovel/* , user: Usuario */) {
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
        numInquilinos: infos.numInquilinos,
        // userId: user.id                  // quando o usuario estiver logado deve armazena-lo na requisição
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

  static async findByName(nome: string) {
    const imoveis = await prisma.imovel.findMany({
      where: {
        nome
      }
    });
    return imoveis;
  }

  static async findByType(tipo: string) {
    const imoveis = await prisma.imovel.findMany({
      where: {
        tipo
      }
    });
    return imoveis;
  }

  static async findByLocale(coords: Coordinates, radius: number) {
    const imoveis = await prisma.imovel.findMany();

    const filtered = imoveis.filter(imovel =>
      isWithin(
        { longitude: imovel.longitude, latitude: imovel.latitude },
        coords,
        radius
      )
    );

    return {
      status: 200,
      message: filtered
    }
  }
  //U
  static async updateName(name: string, id: string) {
    const imovel = await prisma.imovel.update({
      where: { id },
      data: {
        nome: name
      }
    });

    return {
      status: 200,
      message: 'Nomeado com sucesso!'
    }
  }

  static async updateLocale(coords: { latitude: number, longitude: number }, id: string) {
    const imovel = await prisma.imovel.update({
      where: { id },
      data: {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    });

    return {
      status: 200,
      message: 'Modificado com sucesso!'
    }
  }

  static async updateAvailability(mod: boolean, id: string) {
    const imovel = await prisma.imovel.update({
      where: { id },
      data: {
        disponivel: mod
      }
    });

    return {
      status: 200,
      message: 'Modificado com sucesso!'
    }
  }
  //D
  static async delete(id: string) {
    const imovel = await prisma.imovel.delete({
      where: {
        id
      }
    });
    return {
      status: 200,
      message: 'Imovel removido com sucesso'
    }
  }
}

function isWithin(point: Coordinates, center: Coordinates, radiusKm: number): boolean {
  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  const earthRadius = 6371;
  const dLat = toRadians(point.latitude - center.latitude);
  const dLon = toRadians(point.longitude - center.longitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(center.latitude)) * Math.cos(toRadians(point.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance <= radiusKm;
}
