"use client";

import { Tab } from "@/types/links";
import { Mail, MapPin, Phone } from "lucide-react";

export const MENU_ITEMS = [
    {title: "Home", href: "/", hidden: true},
    {title: "Treks", href: "/trek", hidden: false},
    {title: "Profile", href: "/user/profile", hidden: false},
    {title: "About", href: "/about", hidden: true},
]

export const profileTabs: Tab[] = [
  { name: "Profile", path: "/user/profile" },
  { name: "History", path: "/user/history" },
];

export const adminTabs: Tab[] = [
  { name: "Active Booking", path: "/admin/dashboard" },
  { name: "Search Booking", path: "/admin/searchBooking" },
];

export const BG_IMAGE_URL2 = "https://img.freepik.com/premium-vector/hiking-mountain-background_608812-428.jpg?w=1480";
export const BG_IMAGE_URL = "/bgImage.png";

export const contacts = [
  { label: "Email", value: `${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`, icon: <Mail size={20} /> },
  { label: "Phone", value: `${process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}`, icon: <Phone size={20} /> },
  { label: "Address", value: `${process.env.NEXT_PUBLIC_ADDRESS}`, icon: <MapPin size={20} /> },
]