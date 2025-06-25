'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false)
  const { t, i18n } = useTranslation('common')

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(prev => !prev)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
    
  }

  return (
    <header className={`
      sticky top-0 
      flex flex-col justify-between 
      shadow-md shadow-blue-950/20
      ${isMobileMenuOpen ? "h-[250px] overflow-visible" : "h-[60px]"} 
      md:h-[60px] 
      z-50 
      px-5 py-4 
      md:flex-row 
      overflow-hidden md:overflow-visible 
      transition-all duration-300 ease-in-out
      bg-white
    `}>
      
      <div className="flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity p-1">
          <Image 
            src="/Syrai.png" 
            alt="Syria Logo"
            width={120}
            height={40}
            className="h-8 w-auto md:h-10 bg-blue-500"
          />
        </Link>
        
        <button 
          className="md:hidden p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-gray-600 mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
        </button>
      </div>

      <nav className={`
        flex flex-col md:flex-row 
        gap-4 md:gap-6 
        md:items-center
        ${isMobileMenuOpen ? 'mt-4' : 'hidden md:flex'}
      `}>
        <NavLink href="/">{t('header.home')}</NavLink>
        <NavLink href="/about">{t('header.about')}</NavLink>
        <NavLink href="/opportunities">{t('header.opportunities')}</NavLink>
      </nav>

      {/* Language Dropdown */}
      <div className="relative">
        <button 
          onClick={toggleLanguageDropdown}
          className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
          aria-label="Language menu"
          aria-expanded={isLanguageDropdownOpen}
        >
          {i18n.language === 'ar' ? 'العربية' : 'English'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div 
          className={`
            absolute right-0 mt-2 w-32
            bg-white shadow-lg rounded-md
            overflow-hidden
            transition-all duration-200 ease-in-out
            ${isLanguageDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
          `}
        >
          <button
            onClick={() => changeLanguage('en')}
            className="
              block w-full text-left px-4 py-2 
              text-gray-700 hover:bg-blue-50 hover:text-blue-600
              transition-colors
              ${i18n.language === 'en' ? 'bg-blue-50 text-blue-600' : ''}
            "
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className="
              block w-full text-left px-4 py-2 
              text-gray-700 hover:bg-blue-50 hover:text-blue-600
              transition-colors
              ${i18n.language === 'ar' ? 'bg-blue-50 text-blue-600' : ''}
            "
          >
            العربية
          </button>
        </div>
      </div>
    </header>
  )
}

// NavLink component remains the same
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="
        text-gray-700 hover:text-blue-500 
        transition-colors duration-200
        hover:translate-y-0.5
      "
    >
      {children}
    </Link>
  )
}