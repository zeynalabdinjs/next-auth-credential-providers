"use client";
import NextLink from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { Button, NavbarBrand, NavbarContent, NavbarItem, Navbar as NextUINavbar, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const Navbar = () => {
  const { data, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand className="font-bold animate-pulse text-primary-500" as={Link} href="/">
          NEXT-AUTH
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <Skeleton className="rounded-md max-h-[80px]" isLoaded={status !== "loading"}>
          <ul className="flex justify-end items-center w-full gap-4">
            {status === "authenticated" ? (
              <>
                <NavbarItem>
                  <Button as={NextLink} color="primary" variant="shadow" href={"/auth/sign-up"}>
                    Dashboard
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button variant="shadow" color="danger" onClick={handleLogout} isLoading={isLoggingOut}>
                    Log out
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem>
                  <Button as={NextLink} variant="shadow" color="default" href={"/auth/sign-in"}>
                    Sign in
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button as={NextLink} color="primary" variant="shadow" href={"/auth/sign-up"}>
                    Sign up
                  </Button>
                </NavbarItem>
              </>
            )}
          </ul>
        </Skeleton>
        <Button color="default" variant="shadow" isIconOnly>
          <ThemeSwitch />
        </Button>
      </NavbarContent>
    </NextUINavbar>
  );
};
