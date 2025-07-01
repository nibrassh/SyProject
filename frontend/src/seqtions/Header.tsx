"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    const pathWithoutLocale = segments.slice(2).join("/") || "/";
    router.push(`/${newLocale}/${pathWithoutLocale}`);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/opportunities", label: t("opportunities") },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and mobile menu button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/Syrai.png"
              alt="Syria Logo"
              width={140} // Increased width
              height={50} // Increased height
              className="h-10 w-auto md:h-12" // Increased size
            />
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

            <div className="relative ">
              <button
                className="flex items-center text-lg text-gray-700 hover:text-blue-500 font-medium py-2" // Added text-lg
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                {locale === "ar" ? "العربية" : "English"}
                <FaChevronDown className="ml-1 text-sm" />
              </button>

              {langDropdownOpen && (
                <div className="absolute left-0 md:right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === lang.code
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
