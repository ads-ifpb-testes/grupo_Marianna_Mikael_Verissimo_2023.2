import { userServices } from "../services/userServices";
import { prisma } from "../database/prisma.client";
import { hash } from "bcrypt";

describe('Testes de integração para login de usuário', () => {
    const mockUserData = {
        nome: "User",
	    username: "user1223",
	    senha: "senha123",
	    telefone: "12345678910",
	    email: "user@1223.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeAll(async () => {
        const senhaCriptografada = await hash(mockUserData.senha, 5);
        await prisma.usuario.create({
            data:{
                id: "1",
                ...mockUserData,
                senha: senhaCriptografada
            }
        })
    });

    afterAll(async () => {
        await prisma.usuario.delete({
            where:{
                id: "1"
            }
        });
        await prisma.$disconnect();
    });


    it('Deve autenticar um usuário existente e retornar um token', async () => {
        const { username, senha } = mockUserData;
        const token = await userServices.loginUser(username, senha);
        expect(token).toBeDefined();
    });

    it('Deve retornar uma mensagem de erro para um usuário inexistente',async () => {
        const { username } = mockUserData;
        const senha = "senha";
        const result = await userServices.loginUser(username, senha);
        expect(result).toEqual({ 
            message: "Usuário não existe", 
            status: 401, 
            token: null }
        );
    })
})