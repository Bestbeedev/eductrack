"use client";
import React from "react";
import { Button } from "@/components/ui/button";


export default function AdminSidebar() {
  return (
    <aside className="dark:bg-neutral-700/60 bg-white shadow-lg items-center relative rounded-l-lg min-w-52 
    h-screen flex flex-col mx-auto dark:border-neutral-700 border-neutral-100 border-r py-5 ">
      <header className="items-start mb-6 ">
        <h1 className="text-2xl text-green-400">EduTrack.</h1>
      </header>
      <NavigationMenuAdmin />
    </aside>
  );
}

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  BookOpen,
  Calendar,
  CalendarCheck,
  CreditCard,
  GraduationCap,
  HomeIcon,
  University,
  UniversityIcon,
  Settings,
  ChartColumn,
  LogOut,
} from "lucide-react";

type navigationTypes = {
  label: string;
  href: string;
  icon: React.FC<any>;
};

export const navigationLinks: navigationTypes[] = [
  { label: "Accueil", href: "/dashboard/admin", icon: HomeIcon },
  { label: "Mon École", href: "#", icon: University },
  { label: "Enseignants", href: "#", icon: GraduationCap },
  { label: "Élèves", href: "/dashboard/admin/student", icon: BookOpen },
  {
    label: "Classes & Cours",
    href: "/dashboard/admin/student",
    icon: UniversityIcon,
  },
  { label: "Scolarité", href: "#", icon: CreditCard },
  { label: "Programmes", href: "#", icon: Calendar },
  { label: "Événements", href: "#", icon: CalendarCheck },
  { label: "Statistiques", href: "#", icon: ChartColumn },
];

export function NavigationMenuAdmin() {
  return (
    <>
      <NavigationMenu className="items-start  ">
        <NavigationMenuList className="flex flex-col gap-3 border-b pb-8">
          {navigationLinks.map((item, index) => (
            <NavigationMenuItem key={index} className="flex min-w-40">
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink asChild>
                  <a className="flex flex-row items-center w-full gap-3 px-3 py-2 rounded-md hover:bg-green-600 hover:text-white dark:text-neutral-100">
                    <item.icon
                      size={20}
                      className="hover:text-white dark:text-neutral-100 size-5"
                    />
                    <span>{item.label}</span>
                  </a>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button className="mt-5 min-w-40" variant={'outline'}>
      <Settings/>Parametres
     </Button>
     <Button className="mt-3 min-w-40 bg-red-600 hover:bg-red-500 text-white" >
      <LogOut className="text-white"/>Deconnexion
     </Button>
    </>
  );
}


