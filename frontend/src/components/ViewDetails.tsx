'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import InvestmentRequest from './InvestmentFormModal';

interface ViewDetailsProps {
  opportunity: Record<string, any>;
  type: 'company' | 'bransh' | 'center';
}

export default function ViewDetails({ opportunity, type }: ViewDetailsProps) {
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
      ? field[isArabic ? 'ar' : 'en']
      : field;

  const formatKey = (key: string) =>
    key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toLowerCase();

  return (
    <div className="space-y-8 text-gray-900">
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
      {(type === 'company' || type === 'bransh') && (
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
      <div className="space-y-6 text-xl leading-loose text-gray-800">
        {Object.entries(opportunity).map(([key, value]) => {
          if (knownFields.includes(key) || !value) return null;
          return (
            <p key={key}>
              <strong>{formatKey(key)}:</strong> {JSON.stringify(localized( value))}
            </p>
          );
        })}
        <p >
             <strong>Note :</strong> {localized(opportunity.notes)}
            </p>
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

        {type === 'bransh' && opportunity.centers?.length > 0 && (
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
