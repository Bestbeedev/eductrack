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
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"

const formSchema = z.object({
   nom: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères.",
      }),
   type: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  numeroEnregistrement: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  adresse: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  email: z.string().email(),
  telephone: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  siteWeb: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  responsable: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  numeroLicence: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  region: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  codeEcole: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  statut: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  certifications: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  infrastructure: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  accesTechnologie: z.z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
})



export function SchoolForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom:"",  
      type:"" ,
      numeroEnregistrement:"",
      adresse:"",
      telephone:"",
      email:"",
      siteWeb:"",
      responsable:"",
      numeroLicence:"",
      region :"",
      codeEcole:"",
      statut:"",
      certifications:"",
      infrastructure:"" ,
      accesTechnologie:"",
      
    },
  })

  const router=useRouter()

const handleDashboard=()=>{
  router.push('/dashboard/admin')
}

  const handleCheckedState=()=>{
    setChecked(!checked)
  }

  const [checked,setChecked]=React.useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Add your login logic here
    router.push('/dashboard/admin')
  }

  return (
    <Card className="w-full shadow-none bg-transparent h-full border-none text-neutral-700">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Nom de l'Ecole</FormLabel>
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Type de l'ecole</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Prive ou Public" 
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
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Adresse de l'ecole</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Calavi,xxxx"
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
              name="numeroEnregistrement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Numero de l'enregistrement</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ISGBD-12345678O"
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
                  <FormLabel className="dark:text-neutral-200">Numero de telephone</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ecole234@gmail.com"
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
              name="siteWeb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Site web de l'ecole</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="www.ecole.com"
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
              name="responsable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Responsable</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Dao John"
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
              name="numeroLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Numero de licence</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="WERT-1267345YUOI"
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
              name="codeEcole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Code Ecole</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="LCS"
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
              name="statut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Statut Juridique(Prive -Public)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Prive-Public "
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
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Vos certifications </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ISO-21001,DESR-34489"
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
              name="infrastructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Infrastructure</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Immeuble DNS"
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
              name="accesTechnologie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-neutral-200">Acces Technologiques </FormLabel>
                  <FormControl>
                  <Input
                      type="text"
                      placeholder="Salle Informatique, Ordinateurs...."
                      className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 placeholder:text-neutral-500 text-neutral-600"
                      {...field}
                    />
                    {/* <Checkbox onCheckedChange={()=>handleCheckedState} checked={checked}/> */}
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <Button 
              onClick={()=>handleDashboard}
                type="submit" 
                className="w-full bg-green-600 cursor-pointer text-neutral-100 hover:bg-green-700"
              >
                Creer mon ecole
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
