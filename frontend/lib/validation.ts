import { z } from "zod";

export const signupSchema = z.object({
        name: z.string().min(3, {
            message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
        }).nonempty({message:"Le nom d'utilisateur est requis"}),
        email: z.string().email({
            message: "Adresse email invalide"
        }).nonempty({message:"L'email est requis"}),
        phone: z.string().min(10, {
            message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
        }).nonempty({message:"Le numéro de téléphone est requis"}),
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères.",
        }).nonempty({message:"Le mot de passe est requis"}),
        role: z.enum(["etudiant", "enseignant", "admin", "parent"], {
            errorMap: () => ({ message: "Le rôle sélectionné n'est pas valide" })
        })
});

export const loginSchema = z.object({
        email: z.string().email({
            message: "Adresse email invalide"
        }).nonempty({message:"L'email est requis"}),
        password: z.string().min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères.",
        }).nonempty({message:"Le mot de passe est requis"}),
})

