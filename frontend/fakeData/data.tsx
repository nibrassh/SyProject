import { 
  FaBuilding, 
  FaIndustry, 
  FaUmbrellaBeach,
  FaLeaf,
  FaShoppingCart,
  FaRoad
} from 'react-icons/fa';



export const opportunities = [
  {
    id: 1,
    name: "Damascus Reconstruction",
    location: [33.5138, 36.2765],
    type: "Urban Development",
    icon: <FaBuilding className="text-green-600 text-xl" />
  },
  {
    id: 2,
    name: "Aleppo Industrial Zone",
    location: [36.2021, 37.1343],
    type: "Industrial",
    icon: <FaIndustry className="text-blue-600 text-xl" />
  },
  {
    id: 3,
    name: "Coastal Tourism Project",
    location: [35.5357, 35.7822],
    type: "Tourism",
    icon: <FaUmbrellaBeach className="text-yellow-600 text-xl" />
  },
  {
    id: 4,
    name: "Homs Agricultural Center",
    location: [34.7324, 36.7132],
    type: "Agriculture",
    icon: <FaLeaf className="text-green-500 text-xl" />
  },
  {
    id: 5,
    name: "Latakia Port Expansion",
    location: [35.5215, 35.7924],
    type: "Industrial",
    icon: <FaIndustry className="text-blue-600 text-xl" />
  },
  {
    id: 6,
    name: "Palmyra Heritage Site",
    location: [34.5560, 38.2739],
    type: "Tourism",
    icon: <FaUmbrellaBeach className="text-yellow-600 text-xl" />
  },
  {
    id: 7,
    name: "Deir ez-Zor Oil Facility",
    location: [35.3309, 40.1406],
    type: "Industrial",
    icon: <FaIndustry className="text-blue-600 text-xl" />
  },
  {
    id: 8,
    name: "Hama Water Wheels Renovation",
    location: [35.1318, 36.7578],
    type: "Urban Development",
    icon: <FaBuilding className="text-green-600 text-xl" />
  },
  {
    id: 9,
    name: "Quneitra Border Trade Zone",
    location: [33.1256, 35.8243],
    type: "Commercial",
    icon: <FaShoppingCart className="text-purple-600 text-xl" />
  },
  {
    id: 10,
    name: "Tartus Free Zone",
    location: [34.8950, 35.8865],
    type: "Commercial",
    icon: <FaShoppingCart className="text-purple-600 text-xl" />
  },
  {
    id: 11,
    name: "Raqqa Bridge Reconstruction",
    location: [35.9594, 39.0391],
    type: "Infrastructure",
    icon: <FaRoad className="text-gray-600 text-xl" />
  },
  {
    id: 12,
    name: "Idleb Olive Oil Factory",
    location: [35.9297, 36.6317],
    type: "Agriculture",
    icon: <FaLeaf className="text-green-500 text-xl" />
  },
  {
    id: 13,
    name: "Daraa Railway Station",
    location: [32.6189, 36.1023],
    type: "Infrastructure",
    icon: <FaRoad className="text-gray-600 text-xl" />
  }
];