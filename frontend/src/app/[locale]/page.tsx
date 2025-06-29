import HeroSection from '@/components/MainHomeSeq'
import Layout from '@/Layout/Layout'
import React from 'react'

function Home() {

  return (
    <Layout>
 <HeroSection/>
      <p className="text-blue-500 mt-4 text-7xl">Test Tailwind colors</p>
    </Layout>
  )
}

export default Home
