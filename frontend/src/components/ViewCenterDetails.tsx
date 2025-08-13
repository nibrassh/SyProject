
'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import InvestmentRequest from './InvestmentFormModal';

interface ViewDetailsProps {
  opportunity: Record<string, any>;
  type: 'company' | 'branch' | 'center';
}

export default function ViewCenterDetails({ opportunity, type }: ViewDetailsProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [isModalOpen, setIsModalOpen] = useState(false);


  if (!opportunity) return null;

  const knownFields = [
    'name',
    'address',
    'image',
    'shortdescription',
    'longdescription',
    'description',
    'request',
    '_id',
    'updatedAt',
    'createdAt',
    'branchId',
    'branches',
    'centers',
    'compId',
    'notes',
    '__v',
    'location',
  ];

  const localized = (field: any) =>
    typeof field === 'object' && field !== null
      ? field[isArabic ? 'ar' : 'en'] ?? JSON.stringify(field)
      : field;

  const formatKey = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderValue = (key: string, value: any, level = 0): JSX.Element => {
    const padding = level * 16;

    if (value === null || value === undefined) return <></>;

    // Localized field
    if (typeof value === 'object' && 'en' in value && 'ar' in value) {
      return (
        <p key={key} style={{ paddingLeft: padding }}>
          <strong>{formatKey(key)}:</strong> {localized(value)}
        </p>
      );
    }

    // Array
    if (Array.isArray(value)) {
      return (
        <div key={key} style={{ paddingLeft: padding }}>
          <strong>{key !== 'id' && formatKey(key)}:</strong>
          <ul className="list-disc pl-6 space-y-1">
            {value.map((item, index) => (
              <li key={index}>{renderValue(`${key}[${index}]`, item, level + 1)}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Nested object
    if (typeof value === 'object') {
      return (
        <div key={key} style={{ paddingLeft: padding }}>
          <strong>{formatKey(key)}:</strong>
          <div className="ml-4 space-y-1">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderValue(subKey, subValue, level + 1)
            )}
          </div>
        </div>
      );
    }

    // Primitive
    return (
      <p key={key} style={{ paddingLeft: padding }}>
        <strong>{formatKey(key)}:</strong> {String(value)}
      </p>
    );
  };

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 px-4 py-6 mx-auto max-w-4xl space-y-8 text-gray-900">
      {/* Name */}
      {opportunity.name && (
        <h2 className="text-4xl font-extrabold text-center tracking-tight">
          {localized(opportunity.name)}
        </h2>
      )}

      {/* Image */}
      {opportunity.image && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={opportunity.image}
            alt={localized(opportunity.name) || 'Opportunity'}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
            unoptimized
          />
        </div>
      )}

      {/* Address */}
      {opportunity.address && (
        <p className="text-xl text-gray-700">
          {localized(opportunity.address)}
        </p>
      )}

      {/* Descriptions */}
      {(type === 'company' || type === 'branch') && (
        <>
          {opportunity.shortdescription && (
            <p className="text-xl text-gray-700">
              {localized(opportunity.shortdescription)}
            </p>
          )}
          {opportunity.longdescription && (
            <p className="text-xl text-gray-700">
              {localized(opportunity.longdescription)}
            </p>
          )}
        </>
      )}

      {type === 'center' && opportunity.description && (
        <p className="text-xl text-gray-700">
          {localized(opportunity.description)}
        </p>
      )}

      {/* Dynamic Fields */}
      <div className="space-y-6 text-xl leading-loose text-gray-800 ">
        {Object.entries(opportunity).map(([key, value]) => {
          if (knownFields.includes(key) || !value) return null;
          return renderValue(key, value);
        })}

        {opportunity.notes && (
          <p>
            <strong>Note:</strong> {localized(opportunity.notes)}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        {opportunity.request === 'free' && (
          <button 
             onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-200">
            {isArabic ? 'احجز الآن' : 'Reserve Now'}
          </button>
        )}
        {isModalOpen && (
  <InvestmentRequest
    id={opportunity._id}
    type={type}
    onClose={() => setIsModalOpen(false)}
  />
)}

        {type === 'company' && opportunity.branches?.length > 0 && (
          <Link
            href={`/opportunities/${opportunity._id}`}
            className="bg-green-400 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-200"
          >
            {isArabic ? 'عرض الفروع' : 'Show Branches'}
          </Link>
        )}

        {type === 'branch' && opportunity.centers?.length > 0 && (
          <Link
            href={`/opportunities/${opportunity.compId}/${opportunity._id}`}
            className="bg-green-400 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-200"
          >
            {isArabic ? 'عرض المراكز' : 'Show Centers'}
          </Link>
        )}
      </div>
    </div>
  );
}
