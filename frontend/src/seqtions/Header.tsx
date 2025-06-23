'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState<boolean>(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)
  const toggleAuthDropdown = () => setIsAuthDropdownOpen(prev => !prev)

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
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/opportunities">Opportunities</NavLink>
      </nav>

      <div className="relative">
        <button 
          onClick={toggleAuthDropdown}
          className="text-gray-700 hover:text-blue-500 transition-colors"
          aria-label="Authentication menu"
          aria-expanded={isAuthDropdownOpen}
        >
          Account
        </button>
        
        <div 
          className={`
            absolute right-[50%] md:right-0 mt-2 w-48
            bg-white shadow-lg rounded-md
            overflow-hidden
            transition-all duration-200 ease-in-out
            ${isAuthDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
          `}
        >
          <DropdownLink href="/sign-up">Sign Up</DropdownLink>
          <DropdownLink href="/sign-in">Sign In</DropdownLink>
        </div>
      </div>
    </header>
  )
}

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

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        block px-4 py-2 
        text-gray-700 hover:bg-blue-50 hover:text-blue-600
        transition-colors
      "
    >
      {children}
    </Link>
  )
}