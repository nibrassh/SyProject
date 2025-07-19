'use client'
import { useState } from 'react'

interface Opportunity {
  id: number
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  budget: string
  budgetEn: string
  duration: string
  durationEn: string
  image?: string
}

interface InvestmentFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
  opportunity: Opportunity
  isArabic: boolean
}

export default function InvestmentFormModal({ isOpen, onClose, onSubmit, opportunity, isArabic }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState({
    // نبذة تعريفية عن الشركة
    companyOverview: '',
    companyLocations: '',
    companyActivities: '',
    
    // رأس مال الشركة
    companyCapital: '',
    
    // مجال عمل الشركة
    businessField: '',
    mainActivity: '',
    
    // حجم العقود
    contractsSize: '',
    
    // الغاية من الاستثمار
    investmentPurpose: '',
    
    // مدة الاستثمار
    investmentDuration: '',
    
    // شروط الاستثمار
    investmentConditions: '',
    
    // العائد السنوي المتوقع
    expectedAnnualReturn: '',
    
    // عدد العاملين
    employeesCount: '',
    employeesDetails: '',
    
    // الممتلكات العقارية
    realEstateProperties: '',
    
    // أصول الشركة
    fixedAssets: '',
    nonFixedAssets: '',
    
    // المعدات والآلات
    equipmentMachinery: '',
    technicalCondition: '',
    
    // الالتزامات المالية
    financialObligations: '',
    
    // الميزانية المالية
    lastAuditedBalance: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 font-tajawal-bold">
              {isArabic ? 'طلب استثمار' : 'Investment Request'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2 font-tajawal">
            {isArabic ? opportunity.name : opportunity.nameEn}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* نبذة تعريفية عن الشركة */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'نبذة تعريفية عن الشركة' : 'Company Overview'}
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'طبيعة الشركة ونشاطها' : 'Company Nature and Activities'} *
              </label>
              <textarea
                name="companyOverview"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اكتب نبذة عن طبيعة الشركة ونشاطها...' : 'Write about company nature and activities...'}
                value={formData.companyOverview}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'المواقع الجغرافية وتوزع النشاط' : 'Geographical Locations and Activity Distribution'} *
              </label>
              <textarea
                name="companyLocations"
                required
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'حدد المواقع الجغرافية وتوزع النشاط...' : 'Specify geographical locations and activity distribution...'}
                value={formData.companyLocations}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* رأس مال الشركة */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'رأس مال الشركة' : 'Company Capital'}
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'رأس المال (بالليرة السورية)' : 'Capital (in Syrian Pounds)'} *
              </label>
              <input
                type="text"
                name="companyCapital"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'مثال: 50,000,000 ليرة سورية' : 'Example: 50,000,000 Syrian Pounds'}
                value={formData.companyCapital}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* مجال عمل الشركة */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'مجال عمل الشركة' : 'Company Business Field'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'مجال العمل' : 'Business Field'} *
                </label>
                <input
                  type="text"
                  name="businessField"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'مثال: النقل والمواصلات' : 'Example: Transportation'}
                  value={formData.businessField}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'النشاط الرئيسي' : 'Main Activity'} *
                </label>
                <input
                  type="text"
                  name="mainActivity"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'مثال: خدمات المطار' : 'Example: Airport Services'}
                  value={formData.mainActivity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* حجم العقود */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'حجم العقود القائمة' : 'Current Contracts Size'}
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'تفاصيل العقود القائمة' : 'Current Contracts Details'} *
              </label>
              <textarea
                name="contractsSize"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر حجم وطبيعة العقود القائمة مع الشركة...' : 'Mention size and nature of current contracts...'}
                value={formData.contractsSize}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* الغاية من الاستثمار */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'تفاصيل الاستثمار' : 'Investment Details'}
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'الغاية من الاستثمار' : 'Investment Purpose'} *
              </label>
              <textarea
                name="investmentPurpose"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اشرح الهدف من الاستثمار والخطط المستقبلية...' : 'Explain investment goals and future plans...'}
                value={formData.investmentPurpose}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'مدة الاستثمار' : 'Investment Duration'} *
                </label>
                <input
                  type="text"
                  name="investmentDuration"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'مثال: 5 سنوات' : 'Example: 5 years'}
                  value={formData.investmentDuration}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'العائد السنوي المتوقع (%)' : 'Expected Annual Return (%)'}
                </label>
                <input
                  type="text"
                  name="expectedAnnualReturn"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'مثال: 15%' : 'Example: 15%'}
                  value={formData.expectedAnnualReturn}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'شروط الاستثمار' : 'Investment Conditions'} *
              </label>
              <textarea
                name="investmentConditions"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر الشروط والضمانات المطلوبة...' : 'Mention required conditions and guarantees...'}
                value={formData.investmentConditions}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* عدد العاملين */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'الموارد البشرية' : 'Human Resources'}
            </h3>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'عدد العاملين' : 'Number of Employees'} *
              </label>
              <input
                type="number"
                name="employeesCount"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'مثال: 150' : 'Example: 150'}
                value={formData.employeesCount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'تفاصيل العاملين (الوظائف والتخصصات)' : 'Employee Details (Positions and Specializations)'} *
              </label>
              <textarea
                name="employeesDetails"
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر الوظائف والتخصصات والمراكز الوظيفية...' : 'Mention positions, specializations, and job centers...'}
                value={formData.employeesDetails}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* الممتلكات والأصول */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'الممتلكات والأصول' : 'Properties and Assets'}
            </h3>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'الممتلكات العقارية (المواقع والمساحات)' : 'Real Estate Properties (Locations and Areas)'} *
              </label>
              <textarea
                name="realEstateProperties"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر مواقع العقارات ومساحاتها...' : 'Mention property locations and areas...'}
                value={formData.realEstateProperties}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'الأصول الثابتة' : 'Fixed Assets'} *
                </label>
                <textarea
                  name="fixedAssets"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'اذكر الأصول الثابتة...' : 'Mention fixed assets...'}
                  value={formData.fixedAssets}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-tajawal-medium">
                  {isArabic ? 'الأصول غير الثابتة' : 'Non-Fixed Assets'} *
                </label>
                <textarea
                  name="nonFixedAssets"
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                  placeholder={isArabic ? 'اذكر الأصول غير الثابتة...' : 'Mention non-fixed assets...'}
                  value={formData.nonFixedAssets}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* المعدات والآلات */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'المعدات والآلات' : 'Equipment and Machinery'}
            </h3>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'المعدات والآلات والتجهيزات الهندسية والفنية' : 'Equipment, Machinery, and Technical Installations'} *
              </label>
              <textarea
                name="equipmentMachinery"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر المعدات والآلات المتوفرة...' : 'Mention available equipment and machinery...'}
                value={formData.equipmentMachinery}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'الحالة الفنية للمعدات' : 'Technical Condition of Equipment'} *
              </label>
              <textarea
                name="technicalCondition"
                required
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'وصف الحالة الفنية للمعدات...' : 'Describe technical condition of equipment...'}
                value={formData.technicalCondition}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* الالتزامات المالية */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {isArabic ? 'الوضع المالي' : 'Financial Status'}
            </h3>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'الالتزامات المالية (دائنة ومدينة)' : 'Financial Obligations (Creditor and Debtor)'} *
              </label>
              <textarea
                name="financialObligations"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'اذكر الالتزامات المالية والديون...' : 'Mention financial obligations and debts...'}
                value={formData.financialObligations}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-tajawal-medium">
                {isArabic ? 'الميزانية المالية الأخيرة المصدقة' : 'Last Audited Financial Balance'} *
              </label>
              <textarea
                name="lastAuditedBalance"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-tajawal"
                placeholder={isArabic ? 'معلومات عن آخر ميزانية مصدقة...' : 'Information about last audited balance...'}
                value={formData.lastAuditedBalance}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-tajawal-medium"
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-tajawal-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isArabic ? 'إرسال طلب الاستثمار' : 'Submit Investment Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
