import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, createToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";  // Importer le schéma de validation
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validation des données avec Zod
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      // Si la validation échoue, on retourne les erreurs
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ success: false, error: "Email ou Mot de passe incorrect 401" }, { status: 401 });
    }
    //generer le token
    const token = await createToken(user.id);
    // Créer la session
    const session = await createSession(user)
    // Creer la session dans la database
    await db.session.create({
      data: {
        userId: session.user.id,
        token: token,
        expiresAt: session.expires,
      },
    })
    return NextResponse.json({
      success: true,
      user: {
        id: user.id, 
        email: user.email, 
        role: user.role, 
        username: user.username, 
        telephone: user.telephone,
        ecoleId: user.ecoleId
      },
      token,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur du server 500" }, { status: 500 });
  }
}
