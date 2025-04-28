"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/login";
import { SignUpForm } from "@/components/forms/signup";
import { StudentForm } from "@/components/forms/student";
import { TeacherForm } from "@/components/forms/teacher";
import { ParentForm } from "@/components/forms/parent";
import { SchoolForm } from "@/components/forms/school";
import Link from "next/link";

export default function HeroSection() {
  const [menuState, setMenuState] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  //const router = useRouter();

  const handleSignUpSuccess = () => {
    console.log("Signup done");
    setIsSignupDialogOpen(false);
    setIsLoginDialogOpen(true);
  };

  const handleToggleLogin = () => {
    setIsSignupDialogOpen(false);
    setIsLoginDialogOpen(true);
  };

  const handleToggleSignup = () => {
    setIsSignupDialogOpen(true);
    setIsLoginDialogOpen(false);
  };

  const handleLoginSuccess = (role: string) => {
    setSelectedRole(role);
    setIsLoginDialogOpen(false);
    setIsRoleDialogOpen(true);
    //router.push(`/dashboard/${role}`);
  };
  return (
    <>
      <header>
        <nav
          data-state={menuState && "active"}
          className="group fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-gray-950/50 lg:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <h1 className="text-2xl font-semibold text-green-500">
                    EduTrack.
                  </h1>
                </Link>
                <Button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="btn variant-ghost sz-md icon-only relative z-20 -mr-2.5 block cursor-pointer lg:hidden"
                >
                  <svg
                    className="text-title m-auto size-6 transition-[transform,opacity] duration-300 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                    ></path>
                  </svg>
                  <svg
                    className="text-title absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 transition-[transform,opacity] duration-300 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    ></path>
                  </svg>
                </Button>
              </div>

              <div className="bg-ui mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-gray-300/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:group-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-6 lg:space-y-0 lg:text-sm">
                    <li>
                      <Link
                        href="#"
                        className="text-body block hover:text-title"
                      >
                        <span>Features</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-body block hover:text-title"
                      >
                        <span>Documentation</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-body block hover:text-title"
                      >
                        <span>Facturation</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-body block hover:text-title"
                      >
                        <span>A propos</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                  <Button
                    onClick={handleToggleSignup}
                    className="btn variant-soft sz-md lg:sz-xs"
                  >
                    <span>Se connecter</span>
                  </Button>
                  <Button
                    onClick={handleToggleLogin}
                    variant={"outline"}
                    className="btn variant-neutral sz-md lg:sz-xs"
                  >
                    <span className="btn-label">S'inscrire</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="absolute inset-0 isolate z-[2] hidden contain-strict lg:block">
          <div className="absolute left-0 top-0 h-[1280px] w-[560px] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"></div>
          <div className="absolute left-0 top-0 h-[1280px] w-[240px] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]"></div>
          <div className="absolute left-0 top-0 h-[1280px] w-[240px] -translate-y-[350px] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"></div>
        </div>

        <section className="overflow-hidden bg-white dark:bg-transparent">
          <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-title text-balance  text-4xl font-semibold md:text-5xl lg:text-6xl">
              Suivez la progression scolaire de vos enfants en temps réel via <span className="text-green-500">EduTrack.</span>
              </h1>
              <p className="text-body mx-auto mt-8 max-w-2xl text-xl">
                Notre plateforme connecte parents, enseignants et élèves pour un suivi personnalisé des progrès scolaires, des devoirs et des évaluations en temps réel.
              </p>
              {/* Dialog d'inscription */}
              <Dialog
                open={isSignupDialogOpen}
                onOpenChange={setIsSignupDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 my-8 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700">
                    Commencer
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-neutral-800 border dark:border-neutral-700 dark:text-white p-8 rounded-xl max-w-md mx-auto max-h-[86vh] overflow-y-auto">
                  <DialogTitle className="hidden"></DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
                  <div className="space-y-4">
                    <SignUpForm
                      onSuccess={handleSignUpSuccess}
                      onToggleLogin={handleToggleLogin}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mx-auto -mt-16 max-w-7xl">
            <div className="-mr-16 pl-16 [perspective:1000px] rounded-3xl lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(20deg);] ">
                <div className="relative [transform:skewX(.36rad);]  lg:h-[44rem]">
                  <div className="absolute -inset-16 z-[1] bg-gradient-to-b from-white via-transparent to-gray-800 sm:-inset-32 dark:from-neutral-700 dark:via-transparent dark:to-neutral-900"></div>
                  <div className="absolute -inset-16 z-[1] bg-gradient-to-r from-bg-n via-transparent to-white sm:-inset-32 dark:from-neutral-900/80 dark:via-transparent dark:to-neutral-900/90"></div>
                  <div
                    data-shade="glassy"
                    className="absolute -inset-16 bg-[linear-gradient(to_right,var(--ui-border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--ui-border-color)_1px,transparent_1px)] bg-[size:24px_24px] [--ui-border-color:theme(colors.gray.400)] sm:-inset-32 dark:[--ui-border-color:theme(colors.white/0.2)]"
                  ></div>
                  <div className="absolute inset-0 z-[11] bg-gradient-to-l from-white dark:from-gray-950"></div>
                  <div className="absolute inset-0 z-[2] h-full w-full items-center px-5 py-24 [--layer-color:theme(colors.white)] [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--layer-color)_100%)] dark:[--layer-color:theme(colors.gray.950)]"></div>
                  <div className="absolute inset-0 z-[2] h-full w-full items-center px-5 py-24 [--layer-color:theme(colors.white)] [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--layer-color)_100%)] dark:[--layer-color:theme(colors.gray.950)]"></div>

                  <img
                    className="rounded-card relative z-[1] border dark:hidden"
                    src="https://ui.tailus.io/images/showcase/card.png"
                    alt="tailus ui hero section"
                    width=""
                    height=""
                  />
                  <img
                    className="rounded-card relative z-[1] hidden border dark:block"
                    src="https://ui.tailus.io/images/showcase/card-layout-dark.webp"
                    alt="tailus ui hero section"
                    width=""
                    height=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="bg-white py-16 dark:bg-gray-950">
          <div className="m-auto max-w-5xl px-6">
            <h2 className="text-title text-center text-lg font-medium">
              Your favorite companies are our partners.
            </h2>
            <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
              <img
                className="h-5 w-fit dark:invert"
                src="/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-4 w-fit dark:invert"
                src="/blocks/customers/column.svg"
                alt="Column Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-4 w-fit dark:invert"
                src="/blocks/customers/github.svg"
                alt="GitHub Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-5 w-fit dark:invert"
                src="/blocks/customers/nike.svg"
                alt="Nike Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-4 w-fit dark:invert"
                src="/blocks/customers/laravel.svg"
                alt="Laravel Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-7 w-fit dark:invert"
                src="/blocks/customers/lilly.svg"
                alt="Lilly Logo"
                height="28"
                width="auto"
              />
              <img
                className="h-5 w-fit dark:invert"
                src="/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-6 w-fit dark:invert"
                src="/blocks/customers/openai.svg"
                alt="OpenAI Logo"
                height="24"
                width="auto"
              />
              <img
                className="h-4 w-fit dark:invert"
                src="/blocks/customers/tailwindcss.svg"
                alt="Tailwind CSS Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-5 w-fit dark:invert"
                src="/blocks/customers/vercel.svg"
                alt="Vercel Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-5 w-fit dark:invert"
                src="/blocks/customers/zapier.svg"
                alt="Zapier Logo"
                height="20"
                width="auto"
              />
            </div>
          </div>
        </section> */}
      </main>
      {/* Dialog de formulaire spécifique au rôle */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="dark:bg-neutral-800 border dark:border-neutral-700 dark:text-white p-8 rounded-xl max-w-md mx-auto max-h-[80vh] overflow-y-auto">
          <DialogHeader className="px-5">
            <DialogTitle className="text-2xl font-semibold mb-4">
              {selectedRole === "admin" && "Créer une école"}
              {selectedRole === "parent" && "Connexion Parent"}
              {selectedRole === "eleve" && "Connexion Élève"}
              {selectedRole === "enseignant" && "Connexion Enseignant"}
            </DialogTitle>
            <DialogDescription className="-mt-3 dark:text-neutral-300">
              {selectedRole === "admin"
                ? "Remplissez les informations pour créer votre école."
                : "Veuillez entrer vos identifiants pour vous connecter."}
            </DialogDescription>
          </DialogHeader>
          {selectedRole === "admin" && <SchoolForm />}
          {selectedRole === "parent" && <ParentForm />}
          {selectedRole === "eleve" && <StudentForm />}
          {selectedRole === "enseignant" && <TeacherForm />}
        </DialogContent>
      </Dialog>

      {/* Dialog de connexion */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="dark:bg-neutral-800 border dark:border-neutral-700 dark:text-white p-8 rounded-xl max-w-md mx-auto">
          <DialogHeader className="px-6">
            <DialogTitle className="text-2xl font-semibold mb-4">
              Connexion
            </DialogTitle>
            <DialogDescription className="mb-2 -mt-4 dark:text-neutral-300">
              Connectez-vous pour accéder à votre espace
            </DialogDescription>
          </DialogHeader>
          <LoginForm
            onSuccess={handleLoginSuccess}
            onToggleSignup={handleToggleSignup}
          />
        </DialogContent>
      </Dialog>
      <StatsSection/>
      <Pricing/>
      <FooterSection/>
    </>
  );
}


export function StatsSection(){
  return (
      <section className="py-20 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-5xl  space-y-16 px-6">
              <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                  <h2 className="text-title text-4xl font-semibold lg:text-5xl">Utilisateurs de EduTrack</h2>
                  <p className="text-body">Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
              </div>

              <div className="grid gap-4 *:text-center md:grid-cols-3 dark:bg-neutral-800/30 dark:[--ui-soft-bg:var(--ui-bg)]">
                  <div className="card variant-soft dark:bg-neutral-800/30 rounded-xl border dark:border-neutral-700/30 space-y-4 py-12">
                      <div className="text-title text-5xl font-bold">+1200</div>
                      <p className="text-body">Stars on GitHub</p>
                  </div>
                  <div className="card variant-soft dark:bg-neutral-800/30 rounded-xl border dark:border-neutral-700/30  space-y-4 py-12">
                      <div className="text-title text-5xl font-bold">56%</div>
                      <p className="text-body">Conversion rate</p>
                  </div>
                  <div className="card variant-soft dark:bg-neutral-800/30 rounded-xl border dark:border-neutral-700/30  space-y-4 py-12">
                      <div className="text-title text-5xl font-bold">+500</div>
                      <p className="text-body">Powered Apps</p>
                  </div>
              </div>
          </div>
      </section>
  )
}


export function FooterSection(){
    return (
        <footer className="bg-white py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <Link href="/" aria-label="go home" className="mx-auto block size-fit">
                    <img className="size-8" src="/favicon.svg" />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="#" className="text-body block hover:text-title">
                        <span>Features</span>
                    </Link>
                    <Link href="#" className="text-body block hover:text-title">
                        <span>Solution</span>
                    </Link>
                    <Link href="#" className="text-body block hover:text-title">
                        <span>Customers</span>
                    </Link>
                    <Link href="#" className="text-body block hover:text-title">
                        <span>Pricing</span>
                    </Link>
                    <Link href="#" className="text-body block hover:text-title">
                        <span>Help</span>
                    </Link>
                    <Link href="#" className="text-body block hover:text-title">
                        <span>About</span>
                    </Link>
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <a href="#" target="_blank" aria-label="X/Twitter" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path></svg>
                    </a>
                    <a href="#" target="_blank" aria-label="LinkedIn" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                            ><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path></svg
                        >
                    </a>
                    <a href="#" target="_blank" aria-label="Facebook" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path></svg>
                    </a>
                    <a href="#" target="_blank" aria-label="Threads" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4" color="currentColor"></path></svg>
                    </a>
                    <a href="#" target="_blank" aria-label="Instagram" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                            ><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                            ></path></svg
                        >
                    </a>
                    <a href="#" target="_blank" aria-label="TikTok" className="text-body block hover:text-title">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"></path></svg>
                    </a>
                </div>
                <span className="text-caption block text-center text-sm">&copy 2024 Tailus UI, All rights reserved</span>
            </div>
        </footer>
    )
}


export  function Pricing(){
    return (
        <section className="py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-title text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h1>
                    <p className="text-body">Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div className="mt-20 grid gap-6 md:grid-cols-5 md:gap-0 dark:[--ui-soft-bg:var(--ui-bg)]">
                    <div className="card flex flex-col justify-between space-y-8 border md:col-span-2 md:my-[--card-radius] md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-title font-medium">Free</h2>
                                <span className="text-title my-3 block text-2xl font-semibold">$0 / mo</span>
                                <p className="text-sm">Per editor</p>
                            </div>
                            <Link href="" className="btn variant-outlined sz-md">
                                <span className="btn-label"> Get Started</span>
                            </Link>
                            <hr className="border-dashed" />
                            <ul className="list-outside list-image-[url(/dark-check.svg)] space-y-3 pl-4 text-sm *:pl-2 dark:list-image-[url(/check.svg)]">
                                <li>Basic Analytics Dashboard</li>
                                <li>5GB Cloud Storage</li>
                                <li>Email and Chat Support</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card bg-ui dark:bg-ui-soft border shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--ui-border-color:theme(colors.gray.700/0.5)]">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-title font-medium">Pro</h2>
                                    <span className="text-title my-3 block text-2xl font-semibold">$19 / mo</span>
                                    <p className="text-sm">Per editor</p>
                                </div>
                                <Link href="" className="btn variant-primary sz-md">
                                    <span className="btn-label"> Get Started</span>
                                </Link>
                            </div>
                            <div>
                                <div className="text-title text-sm font-medium">Everything in free plus :</div>
                                <ul className="text-title mt-4 list-outside list-image-[url(/dark-check.svg)] space-y-3 pl-5 text-sm *:pl-2 dark:list-image-[url(/check.svg)]">
                                    <li>Basic Analytics Dashboard</li>
                                    <li>5GB Cloud Storage</li>
                                    <li>Email and Chat Support</li>
                                    <li>Access to Community Forum</li>
                                    <li>Single User Access</li>
                                    <li>Access to Basic Templates</li>
                                    <li>Mobile App Access</li>
                                    <li>1 Custom Report Per Month</li>
                                    <li>Monthly Product Updates</li>
                                    <li>Standard Security Features</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}