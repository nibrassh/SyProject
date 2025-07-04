"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Layout from "@/Layouts/Layout";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { adminUser } from "../../../../fakeData/data";

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
      credentials: 'include' // Important for cookies
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Set access token in cookies (handled automatically with credentials: 'include')
      // If you need to set additional client-side cookies:
      document.cookie = `isAdmin=true; path=/; max-age=${60 * 60 * 24}`; // 1 day
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}`;
      
      router.push("/admin");
    } else {
      setError(data.message || t("loginFailed"));
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(t("networkError"));
  } finally {
    setLoading(false);
  }
};
  return (
    <Layout>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("signInTitle")}
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-400/20 text-red-100 text-sm rounded-lg backdrop-blur-sm border border-red-300/30">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                {t("emailLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-white/60" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder-white/40"
                  placeholder={t("emailPlaceholder")}
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                {t("passwordLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-white/60" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder-white/40"
                  placeholder={t("passwordPlaceholder")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg ${
                loading
                  ? "opacity-80 cursor-not-allowed"
                  : "hover:shadow-white/10"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FiLoader className="animate-spin mr-3" />
                  {t("signingIn")}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {t("signInButton")}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
