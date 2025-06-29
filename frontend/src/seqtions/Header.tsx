'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const t = useTranslations('header')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(prev => !prev)

  const changeLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const segments = pathname.split('/')
    const pathWithoutLocale = segments.slice(2).join('/') || '/'
    router.push(`/${newLocale}/${pathWithoutLocale}`)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md shadow-blue-950/20 transition-all duration-300 ease-in-out ${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/Syrai.png" 
              alt="Syria Logo"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
            />
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <NavLink href="/">{t('home')}</NavLink>
            <NavLink href="/about">{t('about')}</NavLink>
            <NavLink href="/opportunities">{t('opportunities')}</NavLink>
            
            {/* Language Dropdown - Desktop */}
            <div className="relative">
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
              >
                {locale === 'ar' ? 'العربية' : 'English'}
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
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${locale === 'en' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${locale === 'ar' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <MobileNavLink href="/" onClick={toggleMobileMenu}>{t('home')}</MobileNavLink>
            <MobileNavLink href="/about" onClick={toggleMobileMenu}>{t('about')}</MobileNavLink>
            <MobileNavLink href="/opportunities" onClick={toggleMobileMenu}>{t('opportunities')}</MobileNavLink>
            
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => changeLanguage('en')}
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded ${locale === 'en' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded ${locale === 'ar' ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                العربية
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded font-medium"
    >
      {children}
    </Link>
  )
}