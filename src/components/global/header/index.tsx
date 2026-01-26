"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { MENU_ITEMS } from "@/constants/links";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ContactDetails from "@/components/global/contactDetails";
import { contacts } from "@/constants/links";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  useEffect(() => {
    // This listener fires whenever the user logs in OR logs out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log("User is logged in:", user.email);
      } else {
        setIsLoggedIn(false);
        console.log("User is logged out");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array is correct here

  return (
    <header className="w-full px-2 py-1 flex items-center justify-between bg-transparent shadow-sm top-0 z-50 absolute">

      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Image alt="logo" src="/icon.svg" width={80} height={40} />
        <Image alt="logo" src="/logoName.svg" width={100} height={60} />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
        {MENU_ITEMS.filter((item) => !item.hidden).map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="hover:text-blue-600 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Phone Icon (Desktop Only) */}
        <div className="hidden lg:flex items-center border-r border-gray-300 pr-4">
          <button 
            className="hover:scale-110 transition-transform text-gray-700"
            onClick={() => setContactDetailsOpen(true)}
          >
            <Phone size={20} />
          </button>
        </div>

        {/* Login Button */}
        <button 
          className={`bg-[#e67e22] hover:bg-[#d35400] text-white px-5 py-2 rounded-md font-semibold transition shadow ${isLoggedIn? "hidden": ""}`} 
          onClick={() => {router.push('/login')}}
          >
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-2 text-gray-800"
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

            {/* Mobile Phone Button */}
            <button 
              className="flex items-center gap-2 text-gray-700 mt-2"
              onClick={() => setContactDetailsOpen(true)}
            >
              <Phone size={18} /> Call Us
            </button>

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
