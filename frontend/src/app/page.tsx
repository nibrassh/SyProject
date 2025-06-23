import HeroSection from "@/components/MainHomeSeq"
import Layout from "@/Layout/Layout"
import Image from "next/image"

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      
        <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Syria's Timeless Architectural Jewel
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Where ancient civilizations converge in stone and mosaic
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image with elegant frame */}
            <div className="relative w-full lg:w-1/2 h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/alomaoy.webp"
                alt="Umayyad Mosque"
                fill
                className="object-cover"
                quality={90}
                priority
              />
              <div className="absolute inset-0 border-8 border-white opacity-20 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-serif text-blue-900 mb-6">
                The Umayyad Mosque
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Built in 715 AD, this architectural masterpiece blends Byzantine and Islamic 
                traditions. Its golden mosaics and grand courtyard have inspired builders for 
                centuries.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">•</div>
                  <p className="text-gray-600">Sacred site for over 3 millennia</p>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">•</div>
                  <p className="text-gray-600">Home to John the Baptist's shrine</p>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mr-3 mt-1">•</div>
                  <p className="text-gray-600">Pioneered Islamic architectural style</p>
                </div>
              </div>

              <button className="mt-8 px-6 py-3 bg-transparent border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                Explore More Heritage
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}