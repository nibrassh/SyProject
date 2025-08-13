import mongoose from 'mongoose';

const centerSchema = new mongoose.Schema({
  
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {  
    en: String,
    ar: String
  },
  management: {
    en: String,
    ar: String
  },
  address: {
    en: String,
    ar: String
  },
  location: {
    type: [Number],  
    required: true,
    index: '2dsphere'
  },

 
  theoreticalCapacity: {  
    value: { type: Number },
    unit: { type: String }
  },
  actualCapacity: { 
    value: { type: Number },
    unit: { type: String  }
  },
  technicalReadiness: { type: Number },  
  specificationCompliance: {  
    en: String,
    ar: String
  },


  producedMaterials: [{ 
    name: {
      en: String,
      ar: String
    },
    specification: String 
  }],


  currentProductCost: { 
    value: { type: Number },
    currency: { type: String, default: "SYP" },
    specification: String 
  },
  monthlyMaintenanceCost: { 
    value: { type: Number },
    currency: { type: String, default: "SYP" }
  },
  operatingCosts: {  
    equipment: [{  
      en: String,
      ar: String
    }],
    laborCosts: {
      value: { type: Number },
      currency: { type: String, default: "SYP" }
    }
  },

    staffStatus: { 
    en: String,
    ar: String
  },
  numberOfEmployees: {
    type: Number,
    default: 0
  },


  notes: {  
    en: String,
    ar: String
  },
   image: {
    type:String,
  },

  // Relationships
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
    index: true
  },
  
  compId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    index: true
  },

  request: {
    type: String,
    enum: ["free", "reverc", "agree"],
    default: "free"
  }
}, { timestamps: true,strict: false  });

const Center = mongoose.model('Center', centerSchema);
export default Center;