import AdminHeader from "@/seqtions/AdminHeader"


function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
   <div className="flex flex-col min-h-screen" dir="rtl">
      <AdminHeader />

      <main className="flex-grow">
        {children}
      </main>
   <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} لوحة التحكم الإدارية</p>
      </footer>
    </div>
  )
}

export default AdminLayout
