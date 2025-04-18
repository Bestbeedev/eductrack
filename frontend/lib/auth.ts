import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// Clé secrète (à stocker dans `.env`)
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

// Générer un token JWT
export async function createToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);
}

// Vérifier un token JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(user: any) {
  const cookieStore = await cookies()
  
  // Créer un token JWT ou utiliser une autre méthode de session
  const session = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
  }
   
  // Stocker la session dans un cookie sécurisé
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: session.expires
  })

  

  return session
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")
  
  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    if (new Date(session.expires) < new Date()) {
      return null
    }
    return session
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export function redirectToLogin() {
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL))
}

export function redirectToDashboard() {
  return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL))
}
