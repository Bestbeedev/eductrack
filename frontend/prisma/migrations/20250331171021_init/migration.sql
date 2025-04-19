-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PARENT', 'ELEVE', 'ENSEIGNANT', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "role" "Role" DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ecoleId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ecole" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "numeroEnregistrement" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "siteWeb" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsable" TEXT NOT NULL,
    "numeroLicence" TEXT,
    "region" TEXT NOT NULL,
    "codeEcole" TEXT,
    "statut" TEXT NOT NULL,
    "certifications" TEXT[],
    "infrastructure" TEXT NOT NULL,
    "accesTechnologie" BOOLEAN NOT NULL,

    CONSTRAINT "Ecole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eleve" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "classeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,

    CONSTRAINT "Eleve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "matiere" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ecoleId" TEXT NOT NULL,

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "ecoleId" TEXT NOT NULL,

    CONSTRAINT "Classe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "matiere" TEXT NOT NULL,
    "valeur" DOUBLE PRECISION NOT NULL,
    "eleveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devoir" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "dateLimite" TIMESTAMP(3) NOT NULL,
    "classeId" TEXT NOT NULL,

    CONSTRAINT "Devoir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presence" (
    "id" TEXT NOT NULL,
    "eleveId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "present" BOOLEAN NOT NULL,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EcoleToEleve" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EcoleToEleve_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EcoleToPaiement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EcoleToPaiement_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ParentEnfant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ParentEnfant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClasseToEnseignant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClasseToEnseignant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DevoirToEleve" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DevoirToEleve_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Eleve_userId_key" ON "Eleve"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Eleve_matricule_key" ON "Eleve"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_matricule_key" ON "Enseignant"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_userId_key" ON "Enseignant"("userId");

-- CreateIndex
CREATE INDEX "_EcoleToEleve_B_index" ON "_EcoleToEleve"("B");

-- CreateIndex
CREATE INDEX "_EcoleToPaiement_B_index" ON "_EcoleToPaiement"("B");

-- CreateIndex
CREATE INDEX "_ParentEnfant_B_index" ON "_ParentEnfant"("B");

-- CreateIndex
CREATE INDEX "_ClasseToEnseignant_B_index" ON "_ClasseToEnseignant"("B");

-- CreateIndex
CREATE INDEX "_DevoirToEleve_B_index" ON "_DevoirToEleve"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ecoleId_fkey" FOREIGN KEY ("ecoleId") REFERENCES "Ecole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_ecoleId_fkey" FOREIGN KEY ("ecoleId") REFERENCES "Ecole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classe" ADD CONSTRAINT "Classe_ecoleId_fkey" FOREIGN KEY ("ecoleId") REFERENCES "Ecole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devoir" ADD CONSTRAINT "Devoir_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_eleveId_fkey" FOREIGN KEY ("eleveId") REFERENCES "Eleve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoleToEleve" ADD CONSTRAINT "_EcoleToEleve_A_fkey" FOREIGN KEY ("A") REFERENCES "Ecole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoleToEleve" ADD CONSTRAINT "_EcoleToEleve_B_fkey" FOREIGN KEY ("B") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoleToPaiement" ADD CONSTRAINT "_EcoleToPaiement_A_fkey" FOREIGN KEY ("A") REFERENCES "Ecole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EcoleToPaiement" ADD CONSTRAINT "_EcoleToPaiement_B_fkey" FOREIGN KEY ("B") REFERENCES "Paiement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentEnfant" ADD CONSTRAINT "_ParentEnfant_A_fkey" FOREIGN KEY ("A") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParentEnfant" ADD CONSTRAINT "_ParentEnfant_B_fkey" FOREIGN KEY ("B") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClasseToEnseignant" ADD CONSTRAINT "_ClasseToEnseignant_A_fkey" FOREIGN KEY ("A") REFERENCES "Classe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClasseToEnseignant" ADD CONSTRAINT "_ClasseToEnseignant_B_fkey" FOREIGN KEY ("B") REFERENCES "Enseignant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DevoirToEleve" ADD CONSTRAINT "_DevoirToEleve_A_fkey" FOREIGN KEY ("A") REFERENCES "Devoir"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DevoirToEleve" ADD CONSTRAINT "_DevoirToEleve_B_fkey" FOREIGN KEY ("B") REFERENCES "Eleve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
