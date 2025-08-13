"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowLeft, FaMapMarkerAlt, FaList } from "react-icons/fa";
import ViewDetails from "./ViewDetails";
import Link from "next/link";
import ViewCenterDetails from "./ViewCenterDetails";

interface Company {
  _id: string;
  name: { en: string; ar: string };
  location: [number, number];
  image?: string;
  shortdescription?: { en: string; ar: string };
  address?: { en: string; ar: string };
  branches?: any[];
}

const createCustomIcon = () =>
  L.divIcon({
    html: `<div style="color: #e74c3c; font-size: 24px;"><svg viewBox="0 0 24 24" style="width:24px;height:24px;"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg></div>`,
    className: "",
    iconSize: [24, 24],
  });

function ChangeMapView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function OpportunitiesMap({
  type,
  opportunities = [],
  viewMode,
  setViewMode,
}: {
  opportunities?: Company[];
}) {
   const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
   const [selectedCompanyDetails, setSelectedCompanyDetails] = useState<Company | null>(null);


  const defaultCenter: [number, number] = [34.8021, 38.9968];
  const defaultZoom = 7;
  const zoomToSelected = 15;

  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("opportunities");

  const mapCenter = selectedCompany?.location || defaultCenter;
  const mapZoom = selectedCompany ? zoomToSelected : defaultZoom;

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="mb-8 "
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "en"}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 font-tajawal-bold">
            {t("title")}
          </h1>

          <div className="relative">
            <select
              value={selectedCompany?._id || ""}
              onChange={(e) => {
                const companyId = e.target.value;
                const company = opportunities.find((c) => c._id === companyId);
                setSelectedCompany(company || null);
              }}
              className={`bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-gray-700 font-tajawal-medium min-w-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm hover:border-indigo-300 transition-all duration-200 ${
                isArabic ? "text-right" : "text-left"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
                    <option value="">
  {
    type === 'company' ? t('companies') :
    type === 'branch' ? (isArabic ? "الفروع" : "branches") :
    type === 'center' ? (isArabic ? "المراكز" : "centers") :
    ''
  }
</option>
              {opportunities.map((item) => (
                <option key={item._id} value={item._id}>
                  {isArabic ? item.name.ar : item.name.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 ">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 p-1 rounded-xl shadow-inner">
              <div
                className={`flex ${
                  isArabic ? "space-x-reverse space-x-1" : "space-x-1"
                }`}
              >
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center px-6 py-3 rounded-lg font-tajawal-medium transition-all duration-300 min-w-[140px] justify-center ${
                    viewMode === "map"
                      ? "bg-white text-indigo-600 shadow-md border border-indigo-100"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <FaMapMarkerAlt
                    className={`text-lg ${isArabic ? "ml-2" : "mr-2"}`}
                  />
                  {t("mapView")}
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center px-6 py-3 rounded-lg font-tajawal-medium transition-all duration-300 min-w-[140px] justify-center ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-md border border-indigo-100"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <FaList className={`text-lg ${isArabic ? "ml-2" : "mr-2"}`} />
                  {t("listView")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*heer I want ths same ordering to the data like the card but in the pouop window  */}
        <div className="h-[500px] w-full">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeMapView center={mapCenter} zoom={mapZoom} />
{opportunities.map((item) => (
  <Marker
    key={item._id}
    position={item.location}
    icon={createCustomIcon()}
  >
    <Popup>
      <div className="text-sm space-y-2 max-w-xs">
        {/* Image */}
        {item.image && (
          <div className="w-full h-24 rounded-md overflow-hidden mb-2">
            <img
              src={item.image}
              alt={isArabic ? item.name.ar : item.name.en}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Name */}
        <strong className="block text-lg font-bold">
          {isArabic ? item.name.ar : item.name.en}
        </strong>

        {/* Address */}
        {item.address && (
          <p className="text-gray-500 text-sm">
            📍 {isArabic ? item.address.ar : item.address.en}
          </p>
        )}

        {/* Short Description */}
        <p>
          {isArabic ? item.shortdescription?.ar : item.shortdescription?.en}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {type === 'company' && item.branches?.length > 0 && (
            <Link
              href={`/opportunities/${item._id}`}
              className="text-indigo-600 font-semibold hover:underline flex items-center"
            >
              {isArabic ? 'عرض الفروع' : 'Show Branches'}
            </Link>
          )}

          {type === 'branch' && item.centers?.length > 0 && (
            <Link
            href={`/opportunities/${item.compId}/${item._id}`}
              className="text-indigo-600 font-semibold hover:underline flex items-center"
            >
              {isArabic ? 'عرض المراكز' : 'Show Centers'}
            </Link>
          )}

          <button
            className="text-indigo-600 font-semibold hover:underline flex items-center"
            onClick={() => setSelectedCompanyDetails(item)} // Assuming setSelectedOpportunity is defined in scope
          >
            {isArabic ? 'عرض التفاصيل' : 'View Details'}
            <FaArrowLeft className={`ml-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </Popup>
  </Marker>
))}


          </MapContainer>
        </div>
      </div>


{/* ViewDetails Modal */}
{selectedCompanyDetails && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[10000] backdrop-blur-sm">
    <div
      className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-y-auto p-10 relative animate-fade-in custom-scroll"
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={isArabic ? 'ar' : 'en'}
    >
      <button
        onClick={() =>setSelectedCompanyDetails(null)}
        className="absolute top-4 right-6 text-gray-400 hover:text-red-600 text-2xl"
      >
        ✕
      </button>
          {type === 'center' ? (
        <ViewCenterDetails opportunity={selectedCompanyDetails} type={type} />
      ) : (
        <ViewDetails opportunity={selectedCompanyDetails} type={type} />
      )}
    </div>
  </div>
)}

    </div>
  );
}
