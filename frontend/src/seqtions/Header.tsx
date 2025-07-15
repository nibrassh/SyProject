"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    const pathWithoutLocale = segments.slice(2).join("/") || "/";

    // Start closing animation
    setIsClosing(true);

    // Close dropdown after animation
    setTimeout(() => {
      setLangDropdownOpen(false);
      setMobileMenuOpen(false);
      setIsClosing(false);

      // Navigate to new language
      router.push(`/${newLocale}/${pathWithoutLocale}`);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        setTimeout(() => {
          setLangDropdownOpen(false);
          setIsClosing(false);
        }, 150);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/opportunities", label: t("opportunities") },
    { href: "/admin", label: t("admin") }
  ];

  return (
    <>
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-indigo-100/50 z-50 py-2 header-glow font-tajawal-medium">
        {/* Enhanced bottom glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Logo and mobile menu button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link href="/" className="group relative">
            <div className="relative">
              <Image
                src="/Syrai.png"
                alt="Syria Logo"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </Link>

          <button
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
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
                className="relative text-lg text-gray-700 hover:text-indigo-600 font-tajawal-medium py-3 px-4 rounded-lg transition-all duration-200 group hover:bg-indigo-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full"></span>
              </Link>
            ))}

            {/* Enhanced Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-tajawal-medium text-gray-700 bg-white border-2 border-indigo-200 rounded-xl shadow-md hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 min-w-[120px]"
                onClick={() => {
                  if (langDropdownOpen) {
                    setIsClosing(true);
                    setTimeout(() => {
                      setLangDropdownOpen(false);
                      setIsClosing(false);
                    }, 150);
                  } else {
                    setLangDropdownOpen(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (langDropdownOpen) {
                      setIsClosing(true);
                      setTimeout(() => {
                        setLangDropdownOpen(false);
                        setIsClosing(false);
                      }, 150);
                    } else {
                      setLangDropdownOpen(true);
                    }
                  }
                }}
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
                aria-label="اختيار اللغة / Language Selection"
              >
                <span className="flex items-center gap-2">
                  {/* Language Icon */}
                  <svg className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>

                  {/* Language Text */}
                  <span className="font-tajawal-bold text-gray-700 group-hover:text-indigo-600 transition-all duration-300">
                    {locale === "ar" ? "العربية" : "English"}
                  </span>

                  {/* Dropdown Arrow */}
                  <FaChevronDown className={`text-xs text-indigo-400 group-hover:text-indigo-600 transition-all duration-300 ${
                    langDropdownOpen && !isClosing ? 'rotate-180 scale-110' : ''
                  }`} />
                </span>
              </button>

              {/* Simplified Dropdown Menu */}
              {langDropdownOpen && (
                <div className={`absolute left-0 md:right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-indigo-100 py-2 z-50 ${
                  isClosing
                    ? 'opacity-0 translate-y-1'
                    : 'opacity-100 translate-y-0'
                } transition-all duration-200`}>
                  {/* Dropdown Header */}
                  <div className="px-4 py-2 border-b border-indigo-100">
                    <p className="text-xs font-tajawal-medium text-gray-500">اختر اللغة / Choose Language</p>
                  </div>
                  {/* Language Options */}
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${
                          locale === lang.code
                            ? "bg-indigo-50 font-tajawal-bold text-indigo-600"
                            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-tajawal-medium"
                        } transition-colors duration-150`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {/* Language Icon */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          locale === lang.code
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {lang.code.toUpperCase()}
                        </div>

                        {/* Language Name */}
                        <span>
                          {lang.label}
                        </span>

                        {/* Active Indicator */}
                        {locale === lang.code && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full ml-auto"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
        </div>
      </header>
    </>
  );
}
