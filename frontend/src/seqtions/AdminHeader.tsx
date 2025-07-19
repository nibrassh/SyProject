"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
 
  
  const navLinks = [
    { href: "/admindashboard", label: "لوحة التحكم" },
    { href: "/admindashboard/investments", label: "إدارة الاستثمارات" },
    { href: "/admindashboard/investment-requests", label: "طلبات الاستثمارات" },
    { href: "/admindashboard/accounts", label: "إدارة الحسابات" },
    { href: "/admindashboard/reports", label: "التقارير" },

  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 py-4" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Navigation menu - الآن في اليمين */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-reverse space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium py-2 px-3 rounded-lg transition-all duration-200 relative group ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Mobile menu button - في الوسط للموبايل */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} className="text-gray-600" /> : <FaBars size={24} className="text-gray-600" />}
          </button>

          {/* Logout button - في اليسار */}
          <div className="flex items-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
            >
              <span>تسجيل الخروج</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation menu */}
        <nav
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:hidden mt-4 pb-4 border-t border-gray-200`}
        >
          <div className="flex flex-col space-y-2 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 text-right ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 shadow-sm border-r-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
