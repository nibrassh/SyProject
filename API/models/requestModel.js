import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },


    companyNatureAndActivities: {
      type: String,
      required: true,
    },
    geographicalLocations: {
      type: String,
      required: true,
    },
    companyCapital: {
      type: Number, 
      required: true,
    },

      businessField: {
      type: String,
      required: true,
    },
    mainActivity: {
      type: String,
      required: true,
    },

   
    currentContractsSize: {
      type: String,
      required: true,
    },
    currentContractsDetails: {
      type: String,
      required: true,
    },

 
    investmentPurpose: {
      type: String,
      required: true,
    },
    investmentDuration: {
      type: String,
      required: true,
    },
    expectedAnnualReturn: {
      type: Number, // as percentage
      required: true,
    },
    investmentConditions: {
      type: String,
      required: true,
    },

    // 6. Human Resources
    numberOfEmployees: {
      type: Number,
      required: true,
    },
    employeeDetails: {
      type: String,
      required: true,
    },

    // 7. Properties and Assets
    realEstateProperties: {
      type: String,
      required: true,
    },
    fixedAssets: {
      type: String,
      required: true,
    },
    nonFixedAssets: {
      type: String,
      required: true,
    },

       equipmentAndMachinery: {
      type: String,
      required: true,
    },
    technicalConditionOfEquipment: {
      type: String,
      required: true,
    },


    financialObligations: {
      type: String,
      required: true,
    },
    lastAuditedFinancialBalance: {
      type: String,
      required: true,
    },
     relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'relatedType'
    },
      relatedType: {
      type: String,
      required: true,
      enum: ['Company', 'branch', 'Center']
    },
  },
  {
    timestamps: true,
  }
);
const Request= mongoose.model("Request", requestSchema);

export default Request;
