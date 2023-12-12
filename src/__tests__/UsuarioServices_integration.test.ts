import { userServices } from "../services/userServices"
import { prisma } from "../database/prisma.client"
import { hash } from "bcrypt"
import { app, server } from "../server"
import request from "supertest"
import { sign } from "jsonwebtoken"

describe("Testes de integração para login de usuário", () => {
    const mockUserData = {
        nome: "User",
        username: "user1223",
        senha: "senha123",
        telefone: "12345678910",
        email: "user@1223.com",
    }
    let token: string
    beforeAll(async () => {
        await prisma.usuario.create({
            data: {
                id: "1",
                ...mockUserData,
                senha: await hash("senha123", 5),
            },
        })
        const user = { name: mockUserData.username }
        token = sign(user, process.env.SECRET as string, {
            subject: "1",
        })
    })

    afterAll(async () => {
        await prisma.usuario.delete({
            where: {
                id: "1",
            },
        })
        await prisma.$disconnect()
        server.close()
    })

    it("Deve autenticar um usuário existente e retornar um token", async () => {
        const { username, senha } = mockUserData
        const token = await userServices.loginUser(username, "senha123")
        expect(token).toBeDefined()
    })

    it("Deve retornar uma mensagem de erro para um usuário inexistente", async () => {
        const { username } = mockUserData
        const senha = "senha"
        const result = await userServices.loginUser(username, senha)
        expect(result).toEqual({
            message: "Usuário não existe",
            status: 401,
            token: null,
        })
    })

    describe("GET /users", () => {
        it("resposta para requisição listar todos recebida com status 200", function (done) {
            request(app)
                .get("/users")
                .auth(token, { type: "bearer" })
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err)
                    return done()
                })
        })
    })
    describe("POST /users", () => {
        it("",)
    })
})
