'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl'
import Image from "next/image"

function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white py-3 border-t border-indigo-200/20 footer-glow">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">

          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <Image
                src="/Syrai.png"
                alt="Syria Logo"
                width={80}
                height={30}
                className="h-6 w-auto opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="text-xs text-gray-300 font-light">
              &copy; {new Date().getFullYear()} {t('copyright')}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 space-x-reverse">
            <Link
              href="/privacy"
              className="text-xs text-gray-300 hover:text-indigo-300 transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-indigo-800/20"
            >
              <span className="relative z-10">{t('privacy')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full"></span>
            </Link>

            <div className="w-px h-4 bg-gray-600"></div>

            <Link
              href="/terms"
              className="text-xs text-gray-300 hover:text-purple-300 transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-purple-800/20"
            >
              <span className="relative z-10">{t('terms')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></span>
            </Link>

            <div className="w-px h-4 bg-gray-600"></div>

            <Link
              href="/contact"
              className="text-xs text-gray-300 hover:text-blue-300 transition-all duration-300 relative group px-2 py-1 rounded-md hover:bg-blue-800/20"
            >
              <span className="relative z-10">{t('contact')}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-500 rounded-full"></span>
            </Link>
          </div>

          {/* Additional Info with Gradient Text */}
          
        </div>
      </div>

      {/* Enhanced glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
    </footer>
  )
}

export default Footer