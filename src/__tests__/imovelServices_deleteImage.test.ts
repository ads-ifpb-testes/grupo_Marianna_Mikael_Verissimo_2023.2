import { ImovelHandle } from '../services/imovelServices';
import { prismaMock } from '../../singleton';
import { deleteFile } from '../utils/file';

jest.mock('../utils/file', () => ({
  deleteFile: jest.fn(),
}));

describe('ImovelHandle.deleteImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deletes image when it exists', async () => {
    const mockImage = {
      id: '1123',
      nomeImagem: 'image1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      imovelId: '1',
    };
    prismaMock.imagem.findFirst.mockResolvedValue(mockImage);
    prismaMock.imagem.delete.mockResolvedValue(mockImage);

    const result = await ImovelHandle.deleteImage('1', 'image1.jpg');

    expect(result).toEqual({
      status: 200,
      message: 'imagem deletada',
    });
    expect(prismaMock.imagem.findFirst).toHaveBeenCalledWith({
      where: {
        imovelId: '1',
        nomeImagem: 'image1.jpg',
      },
    });
    expect(prismaMock.imagem.delete).toHaveBeenCalledWith({
      where: {
        id: '1123',
      },
    });
    expect(deleteFile).toHaveBeenCalledWith('./tmp/imovelImage/image1.jpg');
  });

  test('returns error message when image is not found', async () => {
    prismaMock.imagem.findFirst.mockResolvedValue(null);

    const result = await ImovelHandle.deleteImage('1', 'image1.jpg');

    expect(result).toEqual({
      message: 'imagem não encontrada.',
      status: 404,
    });
    expect(prismaMock.imagem.findFirst).toHaveBeenCalledWith({
      where: {
        imovelId: '1',
        nomeImagem: 'image1.jpg',
      },
    });
    expect(prismaMock.imagem.delete).not.toHaveBeenCalled();
    expect(deleteFile).not.toHaveBeenCalled();
  });

  test('returns error message when database query fails', async () => {
    const mockError = new Error('Database error');
    prismaMock.imagem.findFirst.mockRejectedValue(mockError);

    const result = await ImovelHandle.deleteImage('1', 'image1.jpg');

    expect(result).toEqual({
      message: 'falha ao deletar imagem.',
      error: mockError,
      status: 404,
    });
    expect(prismaMock.imagem.findFirst).toHaveBeenCalledWith({
      where: {
        imovelId: '1',
        nomeImagem: 'image1.jpg',
      },
    });
    expect(deleteFile).not.toHaveBeenCalled();
  });
});