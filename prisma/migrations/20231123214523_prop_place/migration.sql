-- CreateTable
CREATE TABLE "Usuário" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Imóvel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "avalicao" INTEGER NOT NULL,
    "numInquilinos" INTEGER NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Imóvel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuário" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Imagens" (
    "nomeImagem" TEXT NOT NULL PRIMARY KEY,
    "imovelId" TEXT,
    CONSTRAINT "Imagens_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imóvel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuário_username_key" ON "Usuário"("username");
