"use client";
import React from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Bell, MessageSquareText, Moon, Plus, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function NavbarUser() {
  const {user} =useAuthStore()
  console.log(user)
  return (
    <nav className="flex sticky top-0 backdrop-blur-xl w-full bg-white shadow-xs dark:bg-neutral-700/50 p-4  px-8 justify-between">
      <div className="min-w-60 flex gap-2 items-center">
        <Input
          className="w-full dark:text-neutral-200 dark:border-neutral-600"
          type="text"
          placeholder="Rechercher..."
        />
        <Button className="bg-red-600 hover:bg-red-500 text-white">
          <Search size={36} className=""/>
        </Button>
        
      </div>
      <div className="flex gap-5 items-center dark:text-neutral-100">
        <Theme/>
        <Button className="bg-neutral-600 dark:bg-green-500 dark:hover:bg-green-300" variant={"default"}>
          <Plus />
          Create
        </Button>
        <Bell size={20} />
        <MessageSquareText size={20} />
        <Dialog>
          <DialogTrigger asChild>
            <Image
              className="cursor-pointer"
              src="/assets/profil.png"
              width={30}
              height={30}
              alt="Picture of the author"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[430px] dark:bg-neutral-800 dark:border-neutral-700">
            <DialogHeader>
              <DialogTitle className="text-neutral-100">Edit profile</DialogTitle>
              <DialogDescription  className="text-neutral-400">
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-neutral-200">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="name"
                  defaultValue={`${user?.username}`}
                  className="col-span-3 text-neutral-200 border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-neutral-200">
                  Adresse email
                </Label>
                <Input
                  id="username"
                  defaultValue={`${user?.email}`}
                  className="col-span-3 text-neutral-200 border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telephone" className="text-right text-neutral-200">
                  Numero de telephone
                </Label>
                <Input
                  id="username"
                  defaultValue={`${ typeof user?.telephone === undefined && "Telephone" }`}
                  className="col-span-3 text-neutral-200 border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 text-neutral-200">
                <Label htmlFor="role" className="text-right">
                  Connecte en tant que
                </Label>
                <Input
                  id="username"
                  defaultValue={`${user?.role.toLowerCase()}`}
                  className="col-span-3 border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 text-neutral-200">
                <Label htmlFor="addresse" className="text-right">
                  Adresse locale
                </Label>
                <Input
                  id="username"
                  defaultValue={`${user?.adresse}`}
                  className="col-span-3 border-neutral-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 text-neutral-200">
                <Label htmlFor="matricule" className="text-right">
                  Numero Matricule
                </Label>
                <Input
                  id="username"
                  defaultValue={`${user?.matricule}`}
                  className="col-span-3 border-neutral-600"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant={'outline'} type="submit">Sauvergarder les changements</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}


export function Theme(){
  const { setTheme } = useTheme();
  return(
    <>
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mb-3" align="center">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}