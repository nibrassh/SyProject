import AdminLayout from '@/Layout/AdminLayout'
import React from 'react'

function page() {
  return (
    <AdminLayout>
 <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome Admin
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your platform efficiently
            </p>
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Opportunities", value: "24", color: "bg-blue-100 text-blue-800" },
                { title: "Requests", value: "12", color: "bg-green-100 text-green-800" },
                { title: "Users", value: "156", color: "bg-purple-100 text-purple-800" },
              ].map((item) => (
                <div 
                  key={item.title}
                  className={`p-6 rounded-lg shadow-sm ${item.color}`}
                >
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-3xl font-bold mt-2">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
           
      
        </AdminLayout>

  )
}

export default page
