import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true, unique: true },
    ar: { type: String, required: true, unique: true }
  },
  address: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  image: {
    type: String,
  },
  shortdescription: {
    en: String,
    ar: String
  },
  longdescription: {
    en: String,
    ar: String
  },
  location: {
    type: [Number],
    required: true,  
    index: '2dsphere',
  },
  request: {
    type: String,
    enum: ["free", "reverc", "agree"],
    default: "free"
  },
  branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
  

  numberOfEmployees: {
    type: Number,
    default: 0
  },
  notes: {
    en: String,
    ar: String
  },
  machinery: {  
    en: String,
    ar: String
  }
}, { timestamps: true,strict: false   });

const Company = mongoose.model('Company', companySchema);
export default Company;