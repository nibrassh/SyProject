'use client'
import { useState } from 'react'

export default function HeroSection() {
  const [currentProfession, setCurrentProfession] = useState(0)
  const professions = [
    "Contractors",
    "Investors",
    "Engineers",
    "Partners",
    "Architects",
    "Companies"
  ]

  setTimeout(() => {
    setCurrentProfession((prev) => (prev + 1) % professions.length)
  }, 3000)

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-blue-600">Explore</span>
            <span className="block text-gray-800">.. Connect ..</span>
            <span className="block text-blue-600">Achieve</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            <span className="text-gray-600">Connect with</span>{' '}
            <span className="text-blue-600 font-bold relative inline-block min-w-[200px] h-[50px] md:h-[60px]">
              {professions.map((profession, index) => (
                <span 
                  key={profession}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentProfession ? 'opacity-100' : 'opacity-0'}`}
                >
                  {profession}
                </span>
              ))}
            </span>
          </h2>
        </div>

            <div className="mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}