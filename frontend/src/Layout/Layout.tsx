
import Head from 'next/head';
import Footer from '@/seqtions/Footer';
import Header from '@/seqtions/Header';

export default function Layout({ children }) {
 
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Investment Opportunities Map</title>
        <meta name="description" content="Find the best investment opportunities" />
      </Head>

       <Header/>   

        <main className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {children}
      </main>

      <Footer/>
    </div>
  );
}