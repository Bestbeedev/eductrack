import { Role } from "@/types";

export async function signUpUser(data: { 
  name: string, 
  email: string, 
  phone: string, 
  password: string, 
  role: Role 
}) {
  try {
    console.log("Sending signup request to API with data:", data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("API response:", result)
    return result;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return { success: false, error: "Erreur du serveur" };
  }
}


export async function loginUser(data: { email: string, password: string }) {
  try {
    console.log("Sending login request to API with data:", data)
    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("API response:", result)
    return result;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return { success: false, error: "Erreur du serveur" };
  }
}
    