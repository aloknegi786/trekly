"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { Mail, Phone, MapPin, Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Updated Grid: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Column 1: Brand Info (Left Side) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Mountain className="h-6 w-6 text-orange-600" />
              <span>Divya Tour and Treks</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Specializing in turning simple treks into life-changing adventures in the heart of the Garhwal Himalayas.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon 
                icon={<FaFacebook size={20} />} 
                href="https://www.facebook.com/profile.php?id=61586763758189&mibextid=ZbWKwL" 
              />
              <SocialIcon 
                icon={<FaInstagram size={20} />} 
                href="https://www.instagram.com/divya_tour_and_treks?utm_source=qr&igsh=c2t0cHMzdXE0cm9r"
              />
              <SocialIcon 
                icon={<FaMapMarkerAlt size={20} />}
                href="https://share.google/enVvkeaTJK1kdHjIZ" 
              />
            </div>
          </div>

          {/* Column 2: Contact Info (Right Side) */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              {/* Address */}
              <li className="flex items-start gap-3 md:flex-row-reverse md:text-right">
                <MapPin className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  {process.env.NEXT_PUBLIC_ADDRESS}<br />
                  India, {process.env.NEXT_PUBLIC_PIN_CODE}
                </span>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-3 md:flex-row-reverse md:text-right">
                <Phone className="h-5 w-5 text-orange-600 shrink-0" />
                <span>{process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}</span>
              </li>
              {/* Email */}
              <li className="flex items-center gap-3 md:flex-row-reverse md:text-right">
                <Mail className="h-5 w-5 text-orange-600 shrink-0" />
                <span>{process.env.NEXT_PUBLIC_ADMIN_EMAIL}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Divya Tour and Treks. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}