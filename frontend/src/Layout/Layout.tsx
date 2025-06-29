import Footer from "@/seqtions/Footer";
import Header from "@/seqtions/Header";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
<div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {children}
      </main>

      <Footer />
    </div>
  
    
  );
}
