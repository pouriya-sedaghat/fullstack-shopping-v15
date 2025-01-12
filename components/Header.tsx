"use client";

import Link from "next/link";

import { useContext } from "react";

import { CartContext } from "@/context/Cart";

import { signOut, useSession } from "next-auth/react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import DropDown from "./DropDown";

import { Cookies } from "typescript-cookie";

function Header() {
  const {
    state: {
      cart: { cartItems },
    },
  } = useContext(CartContext);

  const { status, data: session } = useSession();

  function signOutHandler() {
    Cookies.remove("cart");

    signOut({ callbackUrl: "/login" });
  }

  return (
    <header className="container-fluid">
      <nav className="flex justify-between items-center">
        <h1 className="text-lg">
          <Link href="/">Shopping</Link>
        </h1>
        <ul className="flex gap-x-2.5">
          <li>
            <Link href="/cart">
              Cart{" "}
              <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-neutral-800">
                {cartItems.reduce((acc, cur) => acc + cur.quantity!, 0)}
              </span>
            </Link>{" "}
          </li>
          <li>
            {status === "loading" ? (
              <span>Loading ...</span>
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <MenuButton className="text-sky-300">
                  {session.user.username}
                </MenuButton>
                <MenuItems className="absolute -right-4 mt-3 origin-top-right z-30 min-w-max bg-neutral-800 text-white rounded-b-md overflow-hidden">
                  {session.user.isAdmin && (
                    <MenuItem>
                      <DropDown
                        href="/admin/dashboard"
                        className="block data-[focus]:bg-neutral-600 px-4 py-2"
                      >
                        Dashboard
                      </DropDown>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <DropDown
                      href="/user/order-history"
                      className="block data-[focus]:bg-neutral-600 px-4 py-2"
                    >
                      Order History
                    </DropDown>
                  </MenuItem>
                  <MenuItem>
                    <DropDown
                      href="#"
                      className="block data-[focus]:bg-neutral-600 px-4 py-2"
                      onClick={signOutHandler}
                    >
                      Logout
                    </DropDown>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
