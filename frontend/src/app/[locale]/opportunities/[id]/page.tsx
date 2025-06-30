'use client'
import Layout from "@/Layout/Layout";
import { opportunities } from '../../../../../fakeData/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCalendarAlt,  FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'next/navigation';

export default function OpportunityDetails() {

  const params = useParams();
  const id = Number(params.id); 

  const opportunity = opportunities[id - 1];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/opportunities" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaArrowLeft className="mr-2" />
            Back to Opportunities
          </Link>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image header */}
          <div className="relative h-64 md:h-80 lg:h-96 w-full">
            <Image
              src={opportunity.image}
              alt={opportunity.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content section */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main details */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                    {opportunity.type}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {opportunity.name}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{opportunity.address}</span>
                </div>

                <div className="prose max-w-none text-gray-700 mb-8">
                  <p className="text-lg mb-4">{opportunity.shortDescription}</p>
                </div>
              </div>

              {/* Sidebar with key facts */}
              <div className="md:w-80 lg:w-96 space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Location</h4>
                        <p className="text-gray-600">{opportunity.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaCalendarAlt className="mt-1 mr-3 text-yellow-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">Project Type</h4>
                        <p className="text-gray-600">{opportunity.type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href={`/opportunities/${id}/request`}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out w-full"
                  >
                    Reserve Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}