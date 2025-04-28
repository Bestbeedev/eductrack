"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { loginSchema } from "@/lib/validation"
import { loginUser } from "@/app/_actions/api/auth"
import { toast } from 'sonner'
import { useAuthStore } from "@/stores/auth"

interface LoginFormProps {
  onSuccess: (role:string) => void;
  onToggleSignup: () => void;
}

export function LoginForm({ onSuccess,onToggleSignup }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { setUser, setIsLoading: setAuthLoading } = useAuthStore()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    setAuthLoading(true)
    try {
      const response = await loginUser(values);
      if (response.success) {
        setUser(response.user, response.token)
        toast.success("Connexion réussie!");
          onSuccess(response.user.role);
      } else {
        toast.error(response.errors);
        console.log(response.errors)
      }
    } catch (error) {
      toast.error("Erreur serveur. Veuillez réessayer.");
    } finally {
      setIsLoading(false)
      setAuthLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-none bg-transparent border-none text-neutral-50">
      <CardHeader className="space-y-1 hidden">
        <h2 className="text-2xl font-semibold text-neutral-700 tracking-tight">Se connecter</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </CardHeader>
      <CardContent className="-mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-green-600 cursor-pointer text-neutral-100 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-100 border-t-transparent" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                "Se connecter"
              )}
            </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm dark:text-neutral-300 text-neutral-700">
        Pas encore de compte?{" "}
          <button onClick={onToggleSignup}  className="dark:text-neutral-200 cursor-pointer dark:hover:text-green-500 hover:text-red-500  underline">
            S'inscrire
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}


