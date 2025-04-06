"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, SquarePlus } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import ProgressBar from "@/components/progress-bar/ProgressBar";

const navigation = [
  { name: "প্রধান পাতা", href: "/" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "পরিসংখ্যান", href: "/statistics" },
];


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="md:sticky md:px-10 px-4 left-0 top-0 z-50 w-full bg-background/100 backdrop-blur supports-[backdrop-filter]:bg-background/100">
        <div className="container flex h-16 items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                {/* <div className="h-[70px] w-[70px] rounded-full p-1 -ml-3"> */}
                  {/* <Image
                   src="/images/icons/scarface.jpg"
                    alt="scarface"
                    width={70}
                    height={70}
                    className="h-full w-full rounded-full object-cover border-2 border-white"
                  /> */}
                  <ProgressBar value={10} maxValue={12} />
                {/* </div> */}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-4 lg:gap-6">
            {navigation.slice(0, 2).map((item) => (
              <Button
                className={` ${
                  pathname === item.href ? "bg-green-700 hover:bg-green-800 hover:text-white" : "ghost"
                } `}
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
              >
                <Link className="text-green-600" href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}

            {navigation.slice(2, navigation.length).map((item) => (
              <Button
                className={` ${
                  pathname === item.href ? "bg-green-700" : "ghost"
                }`}
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
              >
                <Link className="text-green-600" href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-4">

            
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
              <Link className="text-green-600" href='/add-content'>
               
              <Button
                  variant="default"
                  size="icon"
                  className=" text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer"
                >
                  <SquarePlus className="h-4 w-4" />
                </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link className="text-green-600" href='/life-lessons'>
              <Button
                  variant="default"
                  size="icon"
                  className=" text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer"
                >
                  <SquarePlus className="h-4 w-4" />
                </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTitle className="hidden">
            </SheetTitle> 
              <SheetTrigger asChild>
              <Button
                  variant="default"
                  size="icon"
                  className="md:hidden text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
                              
              </SheetTrigger>
              <SheetClose asChild>My</SheetClose>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] overflow-y-auto "
              >
                <div className="flex flex-col gap-4 py-4">
                  <Link href="/" className="flex items-center -mt-3">
                    <div className="relative">
                      <div className="h-[60px] w-[60px] rounded-full ">
                        <Image
                          src="https://i.ibb.co.com/LD27kXxw/473068280-3922681521336562-55110548601466905-n-fotor-bg-remover-20250312165419.png"
                          alt="Mohon Saha"
                          width={70}
                          height={70}
                          className="h-full w-full rounded-full object-cover border-2 border-white"
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Regular navigation items */}
                  {navigation.slice(0, 2).map((item) => (
                    <Button
                      key={item.name}
                      variant={pathname === item.href ? "default" : "ghost"}
                      className={`justify-start ${
                        pathname === item.href ? "bg-green-700" : "ghost"
                      }`}
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link className="text-green-600" href={item.href}>
                        {item.name}
                      </Link>
                    </Button>
                  ))}

                  {/* Remaining navigation items */}
                  {navigation.slice(2, navigation.length).map((item) => (
                    <Button
                      key={item.name}
                      variant={pathname === item.href ? "default" : "ghost"}
                      className={`justify-start ${
                        pathname === item.href ? "bg-green-700" : "ghost"
                      }`}
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link className="text-green-600" href={item.href}>
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


