import Footer from "@/seqtions/Footer";
import Header from "@/seqtions/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}