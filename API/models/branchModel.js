import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  address: {
    en: String,
    ar: String
  },
  image: Object,
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
    index: '2dsphere'
  },
  request: {
    type: String,
    enum: ["free", "reverc", "agree"],
    default: "free"
  },
  compId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: true 
  },
  centers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Center' 
  }],
}, { 
  timestamps: true 
});

branchSchema.index({ compId: 1 });  // For faster queries by company

const Branch = mongoose.model('Branch', branchSchema);
export default Branch;