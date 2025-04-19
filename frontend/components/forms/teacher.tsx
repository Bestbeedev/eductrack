"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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

const formSchema = z.object({
   ecole: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères.",
      }),
  username: z.string().min(3, {
    message: "Le nom d'utilisateur doit contenir au moins 4 caractères.",
  }),
  matricule: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
  classe: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
})

export function TeacherForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    ecole: "",
      username: "",
      matricule: "",
      classe: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Add your login logic here
  }

  return (
    <Card className="w-full bg-transparent border-none text-neutral-700 shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="ecole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Ecole</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Les cours Sonou" 
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Nom et prenoms de enseignant</FormLabel>
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
              name="matricule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Code Enseignant </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="xxx"
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
              name="classe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Classe</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
              >
                Se connecter
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
