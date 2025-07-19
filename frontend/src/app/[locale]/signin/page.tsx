"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Layout from "@/Layouts/Layout";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import axios from 'axios';

export default function SignInPage() {
  const t = useTranslations("SignIn");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    let data;

    // محاولة استخدام API الخارجي أولاً
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/v1/signin`,
        {
          email: formData.email,
          password: formData.password
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      data = response.data;
    } catch (apiError) {
      console.log("External API failed, trying local API...");

      // في حالة فشل API الخارجي، استخدم API المحلي
      const response = await axios.post('/api/signin', {
        email: formData.email,
        password: formData.password
      });
      data = response.data;
    }

    if (data.success) {
      // التوجه إلى لوحة التحكم الجديدة
      router.push("/admindashboard");
    } else {
      setError(data.message || t("loginFailed"));
    }
  } catch (err) {
    console.error("Login error:", err);
    
    // Type-safe error handling
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message || 
        err.message || 
        t("networkError")
      );
    } else {
      setError(t("networkError"));
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <Layout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-white relative overflow-hidden font-tajawal">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50"></div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-100/50 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-100/50 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-100/50 rounded-full blur-xl"></div>
        <div className="w-full max-w-md relative z-10">
          {/* Logo or Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg mb-4">
              <FiLock className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 font-tajawal-bold">
              {t("signInTitle")}
            </h1>
            <p className="text-gray-600 text-sm font-tajawal-medium">
              {t("welcomeBack")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 relative overflow-hidden"
          >
            {/* Form background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30 rounded-3xl"></div>
            <div className="relative z-10">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 font-tajawal-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    {error}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-tajawal-bold text-gray-700 mb-3"
                >
                  {t("emailLabel")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-100 font-tajawal-medium"
                    placeholder={t("emailPlaceholder")}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-indigo-500/5 group-focus-within:via-purple-500/3 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-sm font-tajawal-bold text-gray-700 mb-3"
                >
                  {t("passwordLabel")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-100 font-tajawal-medium"
                    placeholder={t("passwordPlaceholder")}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-blue-500/0 group-focus-within:from-indigo-500/5 group-focus-within:via-purple-500/3 group-focus-within:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-tajawal-bold rounded-xl transition-all duration-300 shadow-xl overflow-hidden ${
                  loading
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:from-indigo-600 hover:to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
                }`}
              >
                {/* Button background effects */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <FiLoader className="animate-spin text-lg" />
                      <span className="text-lg">{t("signingIn")}</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 text-lg">
                      {t("signInButton")}
                      <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </span>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Footer text */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm font-tajawal-medium">
              {t("secureLogin")}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
