import { ImagemHandle } from '../services/imagensServices';
import { prismaMock } from '../../singleton';


describe('Testa visualização de imagem de certo imóvel', () => {
    test('retorna imagens quando existem', async () => {
        const mockImage =
        {
            id: '1123',
            nomeImagem: 'image1.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
            imovelId: '1',
        }
        prismaMock.imagem.findMany.mockResolvedValue([mockImage]);

        const result = await ImagemHandle.getImages('1');
        expect(result).toEqual({
            status: 200,
            message: "requisição completa com sucesso",
            imagens: [mockImage],
        });
    });

    test('retorna erro caso a query falhe no banco de dados', async () => {
        const mockError = new Error('Database error');
        prismaMock.imagem.findMany.mockRejectedValue(mockError);


        const result = await ImagemHandle.getImages('1');
        expect(result).toEqual({
            message: "falha ao procurar imagens.",
            error: mockError,
            status: 404
        });
    });

    test('retorna array vazia quando não há imagens', async () => {
        prismaMock.imagem.findMany.mockResolvedValue([]);

        const result = await ImagemHandle.getImages('1');
        expect(result).toEqual({
            status: 200,
            message: "requisição completa com sucesso",
            imagens: []
        });
    });
});