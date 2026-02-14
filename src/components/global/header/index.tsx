"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { MENU_ITEMS } from "@/constants/links";
import { useRouter } from "next/navigation";
import ContactDetails from "@/components/global/contactDetails";
import { contacts } from "@/constants/links";
import { useAuthStore } from "@/zustand-store";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
  
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="w-full px-2 py-1 flex items-center justify-between bg-transparent shadow-sm top-0 z-50 absolute">

      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image alt="logo" src="/icon.svg" width={80} height={40} priority />
        <Image alt="logo" src="/logoName.svg" width={230} height={40} className="" priority />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
        {MENU_ITEMS.filter((item) => !item.hidden).map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="hover:text-blue-600 transition-colors px-2 py-1 rounded-md" // Added bg for readability over hero images
          >
            {item.title}
          </Link>
        ))}
        
        {/* Safe Admin Check */}
        {isMounted && isLoggedIn && user?.isAdmin && (
          <Link
            href="/admin"
            className="hover:text-blue-600 transition-colors bg-white/80 px-2 py-1 rounded-md"
          >
            Admin
          </Link>
        )}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Phone Icon */}
        <div className="hidden lg:flex items-center border-r border-gray-300 pr-4">
          <button 
            className="hover:scale-110 transition-transform text-white bg-black p-2 rounded-full"
            onClick={() => setContactDetailsOpen(true)}
            aria-label="Contact Us"
          >
            <Phone size={20} />
          </button>
        </div>

        {/* Auth Buttons - Hydration Safe & SEO Friendly */}
        {!isMounted ? (
            // 1. Loading State (Prevents Flicker)
            <div className="w-[80px] h-[40px]" /> 
        ) : isLoggedIn ? (
            // 2. Logged In State
            <Link 
              href="/logout"
              className="hidden lg:flex bg-[#e67e22] hover:bg-[#d35400] text-white px-5 py-2 rounded-md font-semibold transition shadow"
            >
              Logout
            </Link>
        ) : (
            // 3. Logged Out State
            <Link 
              href="/login"
              className="hidden lg:flex bg-[#e67e22] hover:bg-[#d35400] text-white px-5 py-2 rounded-md font-semibold transition shadow"
            >
              Login
            </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-2 text-gray-800 bg-white/50 p-1 rounded-md"
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col px-5 py-4 gap-4 text-gray-800 font-medium">
            {MENU_ITEMS.filter((item) => !item.hidden).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}

            {isMounted && isLoggedIn && user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600 transition-colors"
              >
                Admin
              </Link>
            )}

            <button 
              className="flex items-center gap-2 text-gray-700 mt-2"
              onClick={() => { setContactDetailsOpen(true); setOpen(false); }}
            >
              <Phone size={18} /> Call Us
            </button>

            {/* Mobile Auth Buttons */}
            {isMounted && (
                isLoggedIn ? (
                    <Link 
                        href="/logout" 
                        onClick={() => setOpen(false)}
                        className="bg-[#e67e22] text-center text-white px-5 py-2 rounded-md font-semibold transition shadow"
                    >
                        Logout
                    </Link>
                ) : (
                    <Link 
                        href="/login" 
                        onClick={() => setOpen(false)}
                        className="bg-[#e67e22] text-center text-white px-5 py-2 rounded-md font-semibold transition shadow"
                    >
                        Login
                    </Link>
                )
            )}
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {contactDetailsOpen && (
        <ContactDetails
          onClose={() => setContactDetailsOpen(false)}
          contacts={contacts}
        />
      )}

    </header>
  );
};

export default Header;