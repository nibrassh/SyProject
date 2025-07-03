"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  
  const navLinks = [
    { href: "/admin/add", label: "add opporty" },
    { href: "/admin/opp", label: "opporties" },
    { href: "/admin/requests", label:"requests" },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and mobile menu button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link href="/" 
          className="hover:opacity-80 transition-opacity bg-blue-600 text-white text-[20px] py-2 px-2.5 rounded-3xl">
            Back TO Website
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation menu */}
        <nav
          className={`${
            mobileMenuOpen ? "block " : "hidden"
          } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-gray-700 hover:text-blue-500 font-medium py-2 transition-colors" // Added text-lg
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

              </div>
        </nav>
      </div>
    </header>
  );
}
