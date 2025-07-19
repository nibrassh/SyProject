import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requesterName: { 
    type: String, 
    required: true 
  },
  requesterPhone: { 
    type: String, 
    required: true 
  },
  requesterEmail: { 
    type: String, 
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"] 
  },

   companyInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    headquarters: { type: String, required: true }
  },

  fiveYearExperience: [{
    year: { type: Number, required: true },
    description: { type: String, required: true },
    value: { type: Number } 
  }],

  
  companyDetails: {
    legalName: { type: String, required: true },
    capital: { type: Number, required: true },
    activityType: { type: String, required: true },
    directors: [{
      name: String,
      position: String
    }],
    managementStructure: { type: String, required: true }
  },


  financialAssets: {
    description: String,
    value: Number,
    documents: [String] 
  },


  companyValuation: {
    companyValue: { type: Number, required: true },
    previousProjects: [{
      name: String,
      value: { type: Number, required: true },
      completionDate: Date,
      client: String
    }]
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);
export default Request;