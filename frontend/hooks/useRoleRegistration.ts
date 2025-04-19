// import { db } from "@/lib/db"
// import { toast } from "sonner"

// type UserData = {
//   id: string
//   username: string
//   telephone: string
// }

// export const useRoleRegistration = () => {
//   const registerUserByRole = async (userData: UserData) => {
//     try {
//       switch (userData.role) {
//         case "ADMIN":
//           // Créer un administrateur d'école
//           await db.admin.create({
//             data: {
//               userId: userData.id,
//               nom: userData.username,
//               telephone: userData.telephone,
//             },
//           })
//           break

//         case "ENSEIGNANT":
//           // Créer un enseignant
//           await db.enseignant.create({
//             data: {
//               userId: userData.id,
//               nom: userData.username,
//               telephone: userData.telephone,
//             },
//           })
//           break

//         case "PARENT":
//           // Créer un parent
//           await db.parent.create({
//             data: {
//                 userId: userData.id,
//                 nom: userData.username,
//                 telephone: userData.telephone,
//             },
//           })
//           break

//         case "ELEVE":
//           // Créer un élève
//           await db.eleve.create({
//             data: {
//                 userId: userData.id,
//                 nom: userData.username,
//                 telephone: userData.telephone,
//             },
//           })
//           break

//         default:
//           throw new Error("Rôle non reconnu")
//       }

//       return { success: true }
//     } catch (error) {
//       console.error("Erreur lors de l'enregistrement du rôle:", error)
//       toast.error("Erreur lors de l'enregistrement des informations")
//       return { success: false, error: "Erreur lors de l'enregistrement des informations" }
//     }
//   }

//   return { registerUserByRole }
// } 