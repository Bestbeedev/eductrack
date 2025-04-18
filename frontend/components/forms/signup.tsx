"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "@/lib/validation"  // Assure-toi que le chemin est correct
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { z } from "zod"
import { signUpUser } from "@/lib/actions"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuthStore } from "@/stores/auth"

interface SignUpFormProps {
  onSuccess: () => void;
  onToggleLogin:()=>void;
}
//onResetSignup
export function SignUpForm({ onSuccess,onToggleLogin }: SignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)  
  const { setUser, setIsLoading: setAuthLoading } = useAuthStore()
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      telephone: "",
      password: "",
      role:"USER",
    },
  })


  async function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log("Starting form submission with values:", values)
    setIsLoading(true)
    setAuthLoading(true)
    try {
      console.log("Calling signUpUser...")
      const response = await signUpUser(values);
      console.log("SignUpUser response:", response)
      
      if (response.success) {
        console.log("Setting user in store:", response.user)
        setUser(response.user, response.token)
        toast.success("Inscription réussie!");
        console.log("Calling onSuccess callback")
        onSuccess();
      } else {
        console.error("Signup failed:", response.error)
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error in form submission:", error)
      toast.error("Erreur serveur. Veuillez réessayer.");
    } finally {
      console.log("Form submission completed")
      setIsLoading(false)
      setAuthLoading(false)
    }
  }

  return (
    <Card className="w-full bg-transparent shadow-none border-none text-neutral-50">
      <CardHeader className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold text-neutral-700 tracking-tight">Créer un compte</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          Entrez vos informations ci-dessous pour créer votre compte
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200 text-neutral-700">Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="johndoe" 
                      className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200 text-neutral-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="example@gmail.com" 
                      className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200 text-neutral-700">Numero de téléphone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="+2290161151093"
                      className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200 text-neutral-700">Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200 text-neutral-700">S'inscrire en tant que:</FormLabel>
                  <FormControl>
                      <Select  onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger  className="w-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 text-neutral-600">
                        <SelectValue placeholder="Se connecter en tant que:" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-800  dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"> 
                          <SelectGroup className="hover:cursor-pointer">
                            <SelectLabel>Choix de role</SelectLabel>
                            <SelectItem className="cursor-pointer" value="ADMIN">Créateur d'école</SelectItem>
                            <SelectItem className="cursor-pointer" value="ENSEIGNANT">Enseignant</SelectItem>
                            <SelectItem className="cursor-pointer" value="PARENT">Parent d'élève</SelectItem>
                            <SelectItem className="cursor-pointer" value="ELEVE">Élève</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-green-600 cursor-pointer text-neutral-100 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-100 border-t-transparent" />
                  <span>Inscription en cours...</span>
                </div>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
      <div className="text-sm dark:text-neutral-300 text-neutral-700">
         Deja un compte?{" "}
          <button onClick={onToggleLogin}  className="dark:text-neutral-200 cursor-pointer dark:hover:text-green-500 hover:text-red-500 underline">
            Se connecter
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}
