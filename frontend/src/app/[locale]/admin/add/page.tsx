"use client";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

function AddOpportunityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: { en: "", ar: "" },
    location: ["", ""],
    type: { en: "", ar: "" },
    image: null,
    address: { en: "", ar: "" },
    shortDescription: { en: "", ar: "" },
    longDescription: { en: "", ar: "" },
  });

  const [customFields, setCustomFields] = useState<
    { key: string; value: { en: string; ar: string } }[]
  >([]);
  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState({
    key: "",
    value: { en: "", ar: "" },
  });
  const [currentLang, setCurrentLang] = useState<"en" | "ar">("en"); // Language toggle

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (
      name in formData &&
      typeof formData[name as keyof typeof formData] === "object"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...(prev[name as keyof typeof formData] as {
            en: string;
            ar: string;
          }),
          [currentLang]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocation = [...formData.location];
    newLocation[index] = value;
    setFormData((prev) => ({ ...prev, location: newLocation }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleAddField = () => {
    if (newField.key && (newField.value.en || newField.value.ar)) {
      setCustomFields([...customFields, newField]);
      setNewField({ key: "", value: { en: "", ar: "" } });
      setShowAddField(false);
    }
  };

  const prepareDataForSubmission = () => {
    return {
      ...formData,
      customFields,
    };
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6" dir="rtl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-reverse space-x-2">
            <button
              onClick={() => setCurrentLang("ar")}
              className={`px-3 py-1 rounded ${
                currentLang === "ar" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setCurrentLang("en")}
              className={`px-3 py-1 rounded ${
                currentLang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              English
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            إضافة فرصة استثمارية جديدة
          </h1>
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 text-right">
                  {currentLang === 'ar' ? 'الاسم' : 'Name'} ({currentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name[currentLang]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-right"
                  dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Location
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.location[0]}
                    onChange={(e) => handleLocationChange(0, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Latitude"
                  />
                  <input
                    type="text"
                    value={formData.location[1]}
                    onChange={(e) => handleLocationChange(1, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Longitude"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Type ({currentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type[currentLang]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Address ({currentLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address[currentLang]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Short Description ({currentLang.toUpperCase()})
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription[currentLang]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Long Description ({currentLang.toUpperCase()})
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription[currentLang]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={5}
              />
            </div>
          </div>

          {/* Custom Fields */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">Additional Fields</h3>
              <button
                onClick={() => setShowAddField(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add New Field
              </button>
            </div>

            {showAddField && (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Field name"
                  value={newField.key}
                  onChange={(e) =>
                    setNewField({ ...newField, key: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="English value"
                    value={newField.value.en}
                    onChange={(e) =>
                      setNewField({
                        ...newField,
                        value: { ...newField.value, en: e.target.value },
                      })
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="القيمة العربية"
                    value={newField.value.ar}
                    onChange={(e) =>
                      setNewField({
                        ...newField,
                        value: { ...newField.value, ar: e.target.value },
                      })
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={handleAddField}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Add Field
                </button>
              </div>
            )}

            <div className="space-y-2">
              {customFields.map((field, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-md p-3"
                >
                  <div className="font-medium mb-2">{field.key}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">English</div>
                      <div className="p-2 bg-gray-50 rounded">
                        {field.value.en}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">العربية</div>
                      <div className="p-2 bg-gray-50 rounded text-right">
                        {field.value.ar}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => console.log(prepareDataForSubmission())}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
            >
              Save Opportunity
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddOpportunityPage;
