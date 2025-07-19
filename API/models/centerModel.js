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

 
  theoreticalCapacity: {  // الإنتاجية النظرية
    value: { type: Number, required: true },
    unit: { type: String, default: "m³/hour" }
  },
  actualCapacity: {  // الإنتاجية الفعلية
    value: { type: Number, required: true },
    unit: { type: String, default: "m³/hour" }
  },
  technicalReadiness: { type: Number },  // الجاهزية الفنية (percentage)
  specificationCompliance: {  // مطابقة المواصفات
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

  // Cost Information
  currentProductCost: {  // كلفة المنتج الحالية
    value: { type: Number },
    currency: { type: String, default: "SYP" },
    specification: String  // e.g., "عيار 350 كغ/م3"
  },
  monthlyMaintenanceCost: {  // كلفة صيانة شهريا
    value: { type: Number },
    currency: { type: String, default: "SYP" }
  },
  operatingCosts: {  // كلفة التشغيل
    equipment: [{  // المعدات (e.g., "تركس + مولدة + ضاغط + صهريج مياه")
      en: String,
      ar: String
    }],
    laborCosts: {  // أجور يد عاملة
      value: { type: Number },
      currency: { type: String, default: "SYP" }
    }
  },

  // Technical Specifications
  silos: [{  // السايلوات (e.g., "سيلو اسمنت عدد /2/ × سعة /55/طن")
    count: Number,
    capacity: Number,
    unit: { type: String, default: "ton" }
  }],

  // Staffing Information
  staffStatus: {  // حالة الطاقم (e.g., "طاقم المجبل غير موجود")
    en: String,
    ar: String
  },
  numberOfEmployees: {
    type: Number,
    default: 0
  },

  // Additional Notes
  notes: [{  // ملاحظات
    en: String,
    ar: String
  }],

  // Relationships
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
    index: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    index: true
  },

  // Status
  request: {
    type: String,
    enum: ["free", "reverc", "agree"],
    default: "free"
  }
}, { timestamps: true });

const Center = mongoose.model('Center', centerSchema);
export default Center;