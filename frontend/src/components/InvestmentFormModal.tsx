'use client'

import { useLocale } from 'next-intl';
import { useState } from 'react';
 import axios from 'axios';

import { useRouter } from 'next/navigation';

interface InvestmentRequestProps {
  id: string;
  type: 'Company' | 'Branch' | 'Center';
}

export default function InvestmentRequest({ id, type ,onClose}: InvestmentRequestProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    projectTitle: '',
    companyNatureAndActivities: '',
    geographicalLocations: '',
    companyCapital: '',
    businessField: '',
    mainActivity: '',
    currentContractsSize: '',
    currentContractsDetails: '',
    investmentPurpose: '',
    investmentDuration: '',
    expectedAnnualReturn: '',
    investmentConditions: '',
    numberOfEmployees: '',
    employeeDetails: '',
    realEstateProperties: '',
    fixedAssets: '',
    nonFixedAssets: '',
    equipmentAndMachinery: '',
    technicalConditionOfEquipment: '',
    financialObligations: '',
    lastAuditedFinancialBalance: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



const router = useRouter();
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    let relatedType = '';
    if (type === 'company') relatedType = 'Company';
    else if (type === 'bransh') relatedType = 'Bransh';
    else if (type === 'center') relatedType = 'Center';

    const url = `http://localhost:5000/api/user/v1/request/${type}/${id}`;

    const payload = {
      ...formData,
        relatedType,
    };

    await axios.post(url, payload,{
      withCredentials:true
    });

    alert(isArabic ? 'تم إرسال الطلب بنجاح' : 'Request submitted successfully');
    onClose(); // close modal
    router.refresh(); // refresh page if needed
  } catch (err: any) {
    console.error(err);
    setError(isArabic ? 'حدث خطأ أثناء الإرسال' : 'An error occurred while submitting');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isArabic ? 'طلب استثمار' : 'Investment Request'}
          </h2>

          {Object.entries(formData).map(([field, value]) => (
            <div key={field}>
              <label className="block text-gray-700 mb-2 capitalize">
                {isArabic ? translateLabel(field, 'ar') : translateLabel(field, 'en')} *
              </label>
              {field === 'companyNatureAndActivities' ||
              field === 'geographicalLocations' ||
              field === 'currentContractsDetails' ||
              field === 'investmentPurpose' ||
              field === 'investmentConditions' ||
              field === 'employeeDetails' ||
              field === 'realEstateProperties' ||
              field === 'fixedAssets' ||
              field === 'nonFixedAssets' ||
              field === 'equipmentAndMachinery' ||
              field === 'technicalConditionOfEquipment' ||
              field === 'financialObligations' ||
              field === 'lastAuditedFinancialBalance' ? (
                <textarea
                  name={field}
                  rows={3}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={value}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={value}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}

          <div className="flex justify-between items-center pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isArabic ? 'إرسال الطلب' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function translateLabel(field: string, lang: 'en' | 'ar') {
  const labels: Record<string, { en: string; ar: string }> = {
    email: { en: 'Email', ar: 'البريد الإلكتروني' },
    phone: { en: 'Phone Number', ar: 'رقم الهاتف' },
    projectTitle: { en: 'Project Title', ar: 'عنوان المشروع' },
    companyNatureAndActivities: { en: 'Company Nature and Activities', ar: 'طبيعة الشركة ونشاطها' },
    geographicalLocations: { en: 'Geographical Locations', ar: 'المواقع الجغرافية' },
    companyCapital: { en: 'Company Capital', ar: 'رأس مال الشركة' },
    businessField: { en: 'Business Field', ar: 'مجال العمل' },
    mainActivity: { en: 'Main Activity', ar: 'النشاط الرئيسي' },
    currentContractsSize: { en: 'Current Contracts Size', ar: 'حجم العقود الحالية' },
    currentContractsDetails: { en: 'Current Contracts Details', ar: 'تفاصيل العقود الحالية' },
    investmentPurpose: { en: 'Investment Purpose', ar: 'هدف الاستثمار' },
    investmentDuration: { en: 'Investment Duration', ar: 'مدة الاستثمار' },
    expectedAnnualReturn: { en: 'Expected Annual Return (%)', ar: 'العائد السنوي المتوقع (%)' },
    investmentConditions: { en: 'Investment Conditions', ar: 'شروط الاستثمار' },
    numberOfEmployees: { en: 'Number of Employees', ar: 'عدد الموظفين' },
    employeeDetails: { en: 'Employee Details', ar: 'تفاصيل الموظفين' },
    realEstateProperties: { en: 'Real Estate Properties', ar: 'الممتلكات العقارية' },
    fixedAssets: { en: 'Fixed Assets', ar: 'الأصول الثابتة' },
    nonFixedAssets: { en: 'Non-Fixed Assets', ar: 'الأصول غير الثابتة' },
    equipmentAndMachinery: { en: 'Equipment and Machinery', ar: 'المعدات والآلات' },
    technicalConditionOfEquipment: { en: 'Technical Condition', ar: 'الحالة الفنية للمعدات' },
    financialObligations: { en: 'Financial Obligations', ar: 'الالتزامات المالية' },
    lastAuditedFinancialBalance: { en: 'Last Audited Balance', ar: 'الميزانية الأخيرة المصدقة' }
  };

  return labels[field]?.[lang] || field;
}
