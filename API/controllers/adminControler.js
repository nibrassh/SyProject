import Company from "../models/companyModel.js";
import Branch from "../models/branchModel.js"; 
import Center from "../models/centerModel.js"


function autoParse(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export const companyController = {
  // 1. Create Company
  createCompany: async (req, res) => {
    try {
      const raw = req.body;

      const name = autoParse(raw.name);
      const address = autoParse(raw.address);
      const type = autoParse(raw.type);
      const shortDescription = autoParse(raw.shortDescription);
      const longDescription = autoParse(raw.longDescription);
      const location = autoParse(raw.location);
      const machinery = autoParse(raw.machinery);
      const notes = autoParse(raw.notes);
      const numberOfEmployees = autoParse(raw.numberOfEmployees);
      const request = raw.request || "free";
      const newdata = autoParse(raw.newdata);

      const image = req.file ? { filename: req.file.filename } : {};

      const errors = [];
      if (!name?.en || !name?.ar) errors.push("name.en / name.ar");
      if (!address?.en || !address?.ar) errors.push("address.en / address.ar");
      if (!Array.isArray(location) || location.length !== 2) errors.push("location [lat,lng]");

      if (errors.length) {
        return res.status(400).json({
          success: false,
          message: `Missing or invalid fields: ${errors.join(", ")}`
        });
      }

      const newCompanyData = {
        name,
        address,
        image,
        shortdescription: shortDescription || { en: "", ar: "" },
        longdescription: longDescription || { en: "", ar: "" },
        location: [
          parseFloat(location[0]),
          parseFloat(location[1])
        ],
        request,
        type: type || { en: "", ar: "" },
        machinery: machinery || { en: "", ar: "" },
        notes: notes || { en: "", ar: "" },
        numberOfEmployees: parseInt(numberOfEmployees) || 0,
        branches: []
      };

      if (Array.isArray(newdata)) {
        for (const field of newdata) {
          const [key, value] = Object.entries(field)[0];
          if (value?.en && value?.ar) {
            newCompanyData[key] = {
              en: value.en,
              ar: value.ar
            };
          }
        }
      }

      const newCompany = new Company(newCompanyData);
      await newCompany.save();

      return res.status(201).json({
        success: true,
        message: "Company created successfully",
        companyId: newCompany._id
      });
    } catch (error) {
      console.error("Error creating company:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // 2. Update Company
updateCompany: async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body }; // make a shallow copy to avoid mutating req.body

    // Process newdata into updates
    if (Array.isArray(req.body.newdata)) {
      for (const field of req.body.newdata) {
        const [key, value] = Object.entries(field)[0];
        if (value?.en && value?.ar) {
          updates[key] = {
            en: value.en,
            ar: value.ar
          };
        }
      }

      // ✅ Remove newdata after processing
      delete updates.newdata;
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    return res.json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
},


deleteCompany: async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id).populate("branches");

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Loop through each branch and delete its centers
    for (const branch of company.branches) {
      if (branch.centers && branch.centers.length > 0) {
        await Center.deleteMany({ _id: { $in: branch.centers } });
      }
    }

    // Delete all branches
    await Branch.deleteMany({ _id: { $in: company.branches.map(b => b._id) } });

    // Delete the company
    await Company.findByIdAndDelete(id);

    return res.json({ success: true, message: "Company, its branches, and their centers deleted successfully" });

  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
},


  // 4. Get All Companies
  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find();
      return res.json({ success: true, companies });
    } catch (error) {
      console.error("Error fetching companies:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  // 5. Get Company By ID + Populate branches
  getCompanyById: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findById(id).populate("branches");

      if (!company) {
        return res.status(404).json({ success: false, message: "Company not found" });
      }

      return res.json({ success: true, company });
    } catch (error) {
      console.error("Error fetching company:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
};

export const branchController = {
  // 1. Create Branch
  createBranch: async (req, res) => {
    try {
      const raw = req.body;

      const name = autoParse(raw.name);
      const address = autoParse(raw.address);
      const shortDescription = autoParse(raw.shortDescription);
      const longDescription = autoParse(raw.longDescription);
      const location = autoParse(raw.location);
      const machinery = autoParse(raw.machinery);
      const notes = autoParse(raw.notes);
      const numberOfEmployees = autoParse(raw.numberOfEmployees);
      const request = raw.request || "free";
      const compId = raw.compId;
      const newdata = autoParse(raw.newdata);

      const image = req.file ? { filename: req.file.filename } : {};

      const errors = [];
      if (!name?.en || !name?.ar) errors.push("name.en / name.ar");
      if (!Array.isArray(location) || location.length !== 2) errors.push("location [lat,lng]");
      if (!mongoose.Types.ObjectId.isValid(compId)) errors.push("Invalid compId");

      if (errors.length) {
        return res.status(400).json({
          success: false,
          message: `Missing or invalid fields: ${errors.join(", ")}`
        });
      }

      const newBranchData = {
        name,
        address: address || { en: "", ar: "" },
        image,
        shortdescription: shortDescription || { en: "", ar: "" },
        longdescription: longDescription || { en: "", ar: "" },
        location: [
          parseFloat(location[0]),
          parseFloat(location[1])
        ],
        request,
        machinery: machinery || { en: "", ar: "" },
        notes: notes || { en: "", ar: "" },
        numberOfEmployees: parseInt(numberOfEmployees) || 0,
        compId,
        centers: []
      };

      // Merge extra fields like vision, goals, etc.
      if (Array.isArray(newdata)) {
        for (const field of newdata) {
          const [key, value] = Object.entries(field)[0];
          if (value?.en && value?.ar) {
            newBranchData[key] = {
              en: value.en,
              ar: value.ar
            };
          }
        }
      }

      const newBranch = new Branch(newBranchData);
      await newBranch.save();

           await Company.findByIdAndUpdate(compId, {
        $push: { branches: newBranch._id }
      });

      return res.status(201).json({
        success: true,
        message: "Branch created successfully",
        branchId: newBranch._id
      });
    } catch (error) {
      console.error("Error creating branch:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },

  // 2. Update Branch
updateBranch: async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

  
    if (Array.isArray(req.body.newdata)) {
      for (const field of req.body.newdata) {
        const [key, value] = Object.entries(field)[0];
        if (value?.en && value?.ar) {
          updates[key] = {
            en: value.en,
            ar: value.ar
          };
        }
      }

      delete updates.newdata;
    }

    const updatedBranch = await Branch.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedBranch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    return res.json({
      success: true,
      message: "Branch updated successfully",
      branch: updatedBranch
    });
  } catch (error) {
    console.error("Error updating branch:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
},


deleteBranch: async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    
    await Center.deleteMany({ branchId: branch._id });

    await Branch.findByIdAndDelete(id);

   
    await Company.findByIdAndUpdate(branch.compId, {
      $pull: { branches: branch._id }
    });

    return res.json({ success: true, message: "Branch and its centers deleted successfully" });

  } catch (error) {
    console.error("Error deleting branch:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
},


getAllBranches: async (req, res) => {
  try {
    const { companyId } = req.params;

    const branches = await Branch.find({ compId: companyId })

    return res.json({ success: true, branches });
  } catch (error) {
    console.error("Error fetching branches:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
},


  
  getBranchById: async (req, res) => {
    try {
      const { id } = req.params;
      const branch = await Branch.findById(id)

      if (!branch) {
        return res.status(404).json({ success: false, message: "Branch not found" });
      }

      return res.json({ success: true, branch });
    } catch (error) {
      console.error("Error fetching branch:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  }
};

export const centerController = {
  createCenter: async (req, res) => {
    try {
      const raw = req.body;

      // Parse all expected fields
      const name = autoParse(raw.name);
      const description = autoParse(raw.description);
      const management = autoParse(raw.management);
      const address = autoParse(raw.address);
      const location = autoParse(raw.location);

      const theoreticalCapacity = autoParse(raw.theoreticalCapacity);
      const actualCapacity = autoParse(raw.actualCapacity);
      const technicalReadiness = raw.technicalReadiness !== undefined ? Number(raw.technicalReadiness) : undefined;
      const specificationCompliance = autoParse(raw.specificationCompliance);

      const producedMaterials = autoParse(raw.producedMaterials);

      const currentProductCost = autoParse(raw.currentProductCost);
      const monthlyMaintenanceCost = autoParse(raw.monthlyMaintenanceCost);
      const operatingCosts = autoParse(raw.operatingCosts);

      const staffStatus = autoParse(raw.staffStatus);
      const numberOfEmployees = raw.numberOfEmployees !== undefined ? Number(raw.numberOfEmployees) : 0;

      const notes = autoParse(raw.notes);

      const branchId = raw.branchId;
      const companyId = raw.companyId;

      const request = raw.request || "free";

      // New data array (dynamic extra fields)
      const newdata = autoParse(raw.newdata);

      // Validate required fields
      const errors = [];
      if (!name?.en || !name?.ar) errors.push("name.en / name.ar");
      if (!address?.en || !address?.ar) errors.push("address.en / address.ar");
      if (!Array.isArray(location) || location.length !== 2) errors.push("location [longitude, latitude]");
      if (!theoreticalCapacity || theoreticalCapacity.value === undefined) errors.push("theoreticalCapacity.value");
      if (!actualCapacity || actualCapacity.value === undefined) errors.push("actualCapacity.value");
      if (!branchId || !mongoose.Types.ObjectId.isValid(branchId)) errors.push("valid branchId");
      if (companyId && !mongoose.Types.ObjectId.isValid(companyId)) errors.push("valid companyId");

      if (errors.length) {
        return res.status(400).json({
          success: false,
          message: `Missing or invalid fields: ${errors.join(", ")}`
        });
      }

  
      const newCenterData = {
        name,
        description: description || { en: "", ar: "" },
        management: management || { en: "", ar: "" },
        address,
        location: [parseFloat(location[0]), parseFloat(location[1])],

        theoreticalCapacity: {
          value: Number(theoreticalCapacity.value),
          unit: theoreticalCapacity.unit || ""
        },
        actualCapacity: {
          value: Number(actualCapacity.value),
          unit: actualCapacity.unit || ""
        },
        technicalReadiness,
        specificationCompliance: specificationCompliance || { en: "", ar: "" },

        producedMaterials: Array.isArray(producedMaterials) ? producedMaterials : [],

        currentProductCost: currentProductCost
          ? {
              value: Number(currentProductCost.value) || 0,
              currency: currentProductCost.currency || "SYP",
              specification: currentProductCost.specification || ""
            }
          : {},

        monthlyMaintenanceCost: monthlyMaintenanceCost
          ? {
              value: Number(monthlyMaintenanceCost.value) || 0,
              currency: monthlyMaintenanceCost.currency || "SYP"
            }
          : {},

        operatingCosts: operatingCosts || {
          equipment: [],
          laborCosts: { value: 0, currency: "SYP" }
        },

        staffStatus: staffStatus || { en: "", ar: "" },
        numberOfEmployees: numberOfEmployees || 0,

        notes: notes || { en: "", ar: "" },

        branchId,
        companyId,

        request
      };

      // Merge newdata fields dynamically
      if (Array.isArray(newdata)) {
        newdata.forEach(field => {
          const [key, value] = Object.entries(field)[0];
          if (value?.en !== undefined && value?.ar !== undefined) {
            newCenterData[key] = { en: value.en, ar: value.ar };
          } else {
            newCenterData[key] = value;
          }
        });
      }

      const newCenter = new Center(newCenterData);
      await newCenter.save();

      return res.status(201).json({
        success: true,
        message: "Center created successfully",
        centerId: newCenter._id
      });
    } catch (error) {
      console.error("Error creating center:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  updateCenter: async (req, res) => {
    try {
      const { id } = req.params;
      const raw = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid center id" });
      }

      // Parse newdata for update
      const newdata = autoParse(raw.newdata);

      // Prepare updates object
      const updates = { ...raw };
      delete updates.newdata; // We'll handle newdata separately

      // Handle merging newdata fields
      if (Array.isArray(newdata)) {
        newdata.forEach(field => {
          const [key, value] = Object.entries(field)[0];
          if (value?.en !== undefined && value?.ar !== undefined) {
            updates[key] = { en: value.en, ar: value.ar };
          } else {
            updates[key] = value;
          }
        });
      }

      // Clean up if any fields need parsing like location, theoreticalCapacity etc.
      if (updates.location && typeof updates.location === "string") {
        try {
          updates.location = JSON.parse(updates.location);
        } catch {}
      }

      // Update the document
      const updatedCenter = await Center.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      if (!updatedCenter) {
        return res.status(404).json({ success: false, message: "Center not found" });
      }

      return res.json({
        success: true,
        message: "Center updated successfully",
        center: updatedCenter
      });
    } catch (error) {
      console.error("Error updating center:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  deleteCenter: async (req, res) => {
    try {
      const { id } = req.params;


      const center = await Center.findById(id);
      if (!center) {
        return res.status(404).json({ success: false, message: "Center not found" });
      }

      await Center.findByIdAndDelete(id);

      return res.json({
        success: true,
        message: "Center deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting center:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  getCenterById: async (req, res) => {
    try {
      const { id } = req.params;

    
      const center = await Center.findById(id)
    

      if (!center) {
        return res.status(404).json({ success: false, message: "Center not found" });
      }

      return res.json({
        success: true,
        center
      });
    } catch (error) {
      console.error("Error fetching center:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },
  getCentersByBranchId: async (req, res) => {
  try {
    const { branchId } = req.params;

    const centers = await Center.find({ branchId });

    return res.json({
      success: true,
      centers
    });
  } catch (error) {
    console.error("Error fetching centers by branchId:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

}