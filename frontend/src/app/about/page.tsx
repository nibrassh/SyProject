import Layout from "@/Layout/Layout"
import Image from "next/image"

export default function AboutPage() {
  return (
    <Layout>
        <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Our Mission</h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
      </div>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-blue-800 mb-4">Our Vision</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              We envision a rebuilt Syria where innovation, expertise, and investment converge to create thriving communities and a resilient future. Rebuilding-Syria.com aspires to be the cornerstone of this transformation — a beacon of hope and proof of collective action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images.jpg" 
                alt="Vision for Syria"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-blue-900 mb-6">Our Mission</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To be the leading catalyst for Syria's rebuilding by fostering a transparent, trustworthy, and collaborative ecosystem. We connect credible investors, skilled professionals, and capable companies with viable projects, empowering sustainable development and national revival.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light text-blue-800 mb-4">Why Rebuilding Syria?</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Because being part of Syria's rebuilding opens countless doors in the region. Syria's future holds immense opportunity — and those who take a step now will be ahead when the tide turns.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <p className="text-2xl font-serif text-blue-900 mb-4">
              "Rebuilding Syria has begun. Your decision today defines your position tomorrow."
            </p>
            <p className="text-lg text-gray-700">
              Put yourself on the rebuilding map — starting now.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Join the Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to be part of Syria's renaissance? Contact us to learn how you can contribute.
          </p>
          <div className="flex flex-col items-center">
            <a 
              href="mailto:example@gmail.com" 
              className="px-8 py-3 bg-white text-blue-800 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Message Us: example@gmail.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}