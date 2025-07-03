'use client'
import Layout from "@/Layouts/Layout"
import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaClock, FaPaperclip, FaPaperPlane } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

export default function RequestPage() {
  const t = useTranslations('RequestPage')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    timeline: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, file })
    alert(t('successMessage'))
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-blue-500" />
                {t('form.name')} *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('placeholders.name')}
                value={formData.name}
                onChange={handleChange}
              />
              <FaUser className="absolute left-3 top-11 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-blue-500" />
                {t('form.email')} *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('placeholders.email')}
                value={formData.email}
                onChange={handleChange}
              />
              <FaEnvelope className="absolute left-3 top-11 text-gray-400" />
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaPhone className="inline mr-2 text-blue-500" />
                {t('form.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('placeholders.phone')}
                value={formData.phone}
                onChange={handleChange}
              />
              <FaPhone className="absolute left-3 top-11 text-gray-400" />
            </div>

            {/* Company */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaBuilding className="inline mr-2 text-blue-500" />
                {t('form.company')}
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('placeholders.company')}
                value={formData.company}
                onChange={handleChange}
              />
              <FaBuilding className="absolute left-3 top-11 text-gray-400" />
            </div>

            {/* Position */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaBriefcase className="inline mr-2 text-blue-500" />
                {t('form.position')}
              </label>
              <input
                type="text"
                name="position"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('placeholders.position')}
                value={formData.position}
                onChange={handleChange}
              />
              <FaBriefcase className="absolute left-3 top-11 text-gray-400" />
            </div>

            {/* Timeline */}
            <div className="relative">
              <label className="block text-gray-700 mb-2">
                <FaClock className="inline mr-2 text-blue-500" />
                {t('form.timeline')} *
              </label>
              <select
                name="timeline"
                required
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">{t('form.timelineOptions.default')}</option>
                <option value="immediate">{t('form.timelineOptions.immediate')}</option>
                <option value="1-3 months">{t('form.timelineOptions.1_3_months')}</option>
                <option value="3-6 months">{t('form.timelineOptions.3_6_months')}</option>
                <option value="6+ months">{t('form.timelineOptions.over_6_months')}</option>
              </select>
              <FaClock className="absolute left-3 top-11 text-gray-400" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-8">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">{t('form.message')} *</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('placeholders.message')}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-gray-700 mb-2">
              <FaPaperclip className="inline mr-2 text-blue-500" />
              {t('form.file.label')}
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaPaperclip className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : t('form.file.placeholder')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t('form.file.hint')}</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mx-auto"
            >
              <FaPaperPlane className="mr-2" />
              {t('form.submit')}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>{t('followUp')}</p>
        </div>
      </div>
    </Layout>
  )
}