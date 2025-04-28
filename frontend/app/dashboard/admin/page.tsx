"use client";

import { useAuthStore } from "@/stores/auth";


export default function AdminDashboard() {
  const { user, token } = useAuthStore();
  return (
    <section className="w-full ">
        <header className="my-6">
          {/* <h1 className="text-3xl dark:text-white">
            Bienvenue sur le Dashboard{" "}
            <span className="text-green-400">{user?.username}</span>
          </h1> */}
          <h1 className="text-3xl dark:text-white">
           Dashboard de l'ecole: {" "}
            <span className="text-green-400">Les Pharaons</span>
          </h1>
          
        </header>
        <h2 className="text-xl my-3 dark:text-white">
          1. Vue Générale 
          </h2>    
        <main className="h-fit w-full p-5 bg-white dark:bg-neutral-700/50 rounded-xl">
        <TotalOwerviews/>
        </main>
        <div className="flex flex-col items-center w-full gap-4 mt-8">
          <p className="dark:text-white">{user?.id}</p>
          <p className="dark:text-white">{user?.phone}</p>
          <p className="dark:text-white">{user?.role}</p>
          <p className="dark:text-white text-sm hidden">{token}</p>
        </div>
    </section>
  );
}
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import { GraduationCap } from "lucide-react";
import { useEffect } from "react";
export function TotalOwerviews(){
    return(
        <section className="grid grid-cols-3 gap-3">
        <Card className="h-fit dark:bg-neutral-800/50">
            <CardHeader className="flex items-center gap-3 border-b">
                <span className="bg-green-500 p-2 rounded-lg text-white items-center">
                <GraduationCap/>
                </span>
                <CardTitle>Total Eleves</CardTitle>
            </CardHeader>
            <CardContent >
                <h1 className="text-4xl text-center">22356</h1>
            </CardContent>
        </Card>
        <Card className="h-fit dark:bg-neutral-800/50">
            <CardHeader className="flex items-center gap-3 border-b">
                <span className="bg-green-500 p-2 rounded-lg text-white items-center">
                <GraduationCap/>
                </span>
                <CardTitle>Total Classes</CardTitle>
            </CardHeader>
            <CardContent >
                <h1 className="text-4xl text-center">16</h1>
            </CardContent>
        </Card>
        <Card className="h-fit dark:bg-neutral-800/50">
            <CardHeader className="flex items-center gap-3 border-b">
                <span className="bg-green-500 p-2 rounded-lg text-white items-center">
                <GraduationCap/>
                </span>
                <CardTitle>Total Enseignants</CardTitle>
            </CardHeader>
            <CardContent >
                <h1 className="text-4xl text-center">100</h1>
            </CardContent>
        </Card>
        </section>

    )
}
