'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Opportunity {
  id: number
  name: string
  location: [number, number]
  type: string
  image: string
  address: string
  shortDescription: string
}

const createCustomIcon = () => {
  return L.divIcon({
    html: `<div style="color: #e74c3c; font-size: 24px;"><svg viewBox="0 0 24 24" style="width:24px;height:24px;"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg></div>`,
    className: '',
    iconSize: [24, 24]
  })
}

export default function OpportunitiesMap({ opportunities }: { opportunities: Opportunity[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mapCenter] = useState([34.8021, 38.9968])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search opportunities by location or type..."
            className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <FaSearch className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 z-0">
        <MapContainer
          center={mapCenter}
          zoom={7}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {opportunities.map(opp => (
            <Marker 
              key={opp.id} 
              position={opp.location}
              icon={createCustomIcon()}
            >
              <Popup className="custom-popup">
                <div className="space-y-3 min-w-[250px]">
                  <h3 className="font-bold text-lg text-blue-600">{opp.name}</h3>
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image
                      src={opp.image}
                      alt={opp.name}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700"><span className="font-medium">Type:</span> {opp.type}</p>
                    <p className="text-gray-700"><span className="font-medium">Location:</span> {opp.address}</p>
                    <p className="text-gray-700 line-clamp-2">{opp.shortDescription}</p>
                  </div>
                  <Link href={`/opportunities/${opp.id}`} 
                  className="block mt-2 px-4 py-2 text-center rounded  transition"
                  >
                    View All Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>Use mouse wheel to zoom, click and drag to pan the map</p>
      </div>
    </div>
  )
}