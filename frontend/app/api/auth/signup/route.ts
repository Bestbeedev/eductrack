import { NextRequest, NextResponse } from "next/server";
import bcrypt, { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation"
import { createSession, createToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = signupSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    const { username, email, telephone, password, role } = validatedData.data;
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    })
    if (existingUser) {
      return NextResponse.json({ success:false, error: "Un utilisateur avec cet email existe déjà" }, { status: 400 });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer l'utilisateur
    const user = await db.user.create({
      data: {
        username: username,
        email: email,
        telephone: telephone,
        password: hashedPassword,
        role: role,
      },
    })
    //Creer la table user-param en foction du role

    //generer le token
    const token = await createToken(user.id);
    // Créer la session
    const session=await createSession(user)
    // Creer la session dans la database
    await db.session.create({
      data: {
        userId: session.user.id,
        token:token,
        expiresAt: session.expires,
      },
    })

    return NextResponse.json({success: true, user: user, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur 500" }, { status: 500 });
  }

}