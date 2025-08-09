import Company from "../models/companyModel.js";
import Branch from "../models/branchModel.js";
import Center from "../models/centerModel.js"
import Request from "../models/requestModel.js";


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

      
    const image = req.file
  ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
  : "";
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
        image, // Store as Base64 string
        shortdescription: shortDescription || { en: "", ar: "" },
        longdescription: longDescription || { en: "", ar: "" },
        location: [parseFloat(location[0]), parseFloat(location[1])],
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
            newCompanyData[key] = { en: value.en, ar: value.ar };
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


  updateCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      // Convert uploaded image to Base64 string
    if (req.file) {
  updates.image = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
}

      // Process newdata array
      const newdata = req.body.newdata;
      if (newdata && Array.isArray(newdata)) {
        for (const field of newdata) {
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

      // Fix location type: if it's a string, parse it
      if (updates.location && typeof updates.location === "string") {
        try {
          updates.location = JSON.parse(updates.location);
        } catch (err) {
          console.warn("Invalid location format, expected [lng, lat]", err);
        }
      }

      // Ensure location is [lng, lat] as numbers
      if (Array.isArray(updates.location) && updates.location.length === 2) {
        updates.location = [
          parseFloat(updates.location[0]),
          parseFloat(updates.location[1])
        ];
      }

      // Perform the update
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
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
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

  getCompanyById: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findById(id).populate({
        path: "branches"
      });;

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
      const compId = req.params.id

      const company = await Company.findById(compId);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found"
        });
      };

      const name = autoParse(raw.name);
      const address = autoParse(raw.address);
      const shortDescription = autoParse(raw.shortDescription);
      const longDescription = autoParse(raw.longDescription);
      const location = autoParse(raw.location);
      const machinery = autoParse(raw.machinery);
      const notes = autoParse(raw.notes);
      const numberOfEmployees = autoParse(raw.numberOfEmployees);
      const request = raw.request || "free";
      const newdata = autoParse(raw.newdata);

      // Convert image to Base64 string if provided
 const image = req.file
  ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
  : "";

      const errors = [];
      if (!name?.en || !name?.ar) errors.push("name.en / name.ar");
      if (!Array.isArray(location) || location.length !== 2) errors.push("location [lat,lng]");
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
            newBranchData[key] = { en: value.en, ar: value.ar };
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

      // Convert uploaded image to Base64 string
     if (req.file) {
  updates.image = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
}
      // Process newdata array
      if (Array.isArray(req.body.newdata)) {
        for (const field of req.body.newdata) {
          const [key, value] = Object.entries(field)[0];
          if (value?.en && value?.ar) {
            updates[key] = { en: value.en, ar: value.ar };
          }
        }
        delete updates.newdata;
      }

      if (updates.location && typeof updates.location === "string") {
        try {
          updates.location = JSON.parse(updates.location);
        } catch (err) {
          console.warn("Invalid location format, expected [lng, lat]", err);
        }
      }

      // Ensure location is [lng, lat] as numbers
      if (Array.isArray(updates.location) && updates.location.length === 2) {
        updates.location = [
          parseFloat(updates.location[0]),
          parseFloat(updates.location[1])
        ];
      }

      // Update the branch
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
      const { id } = req.params;
  console.log(id)
      const branshes = await Branch.find({ compId:id })

      return res.json({ success: true, branshes });
    } catch (error) {
      console.error("Error fetching branches:", error);
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  },



  getBranchById: async (req, res) => {
    try {
      const { id } = req.params;
      const branch = await Branch.findById(id).populate({
        path: "centers"
      })

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
      const branchId = req.params.id;
      if (!branchId) {
        return res.status(400).json({
          success: false,
          message: "branchId is required"
        });
      }

      // Find branch
      const branch = await Branch.find({_id: branchId});
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "Branch not found"
        });
      }

      const companyId = branch.compId; // Fixed: get companyId from branch
          console.log(companyId)
      // Parse data
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
      const request = raw.request || "free";
      const newdata = autoParse(raw.newdata);

      // Process image to Base64
 const image = req.file
  ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
  : "";


      // Validate required fields
      const errors = [];
      if (!name?.en || !name?.ar) errors.push("name.en / name.ar");
      if (!address?.en || !address?.ar) errors.push("address.en / address.ar");
      if (!Array.isArray(location) || location.length !== 2) errors.push("location [longitude, latitude]");

      if (errors.length) {
        return res.status(400).json({
          success: false,
          message: `Missing or invalid fields: ${errors.join(", ")}`
        });
      }

      // Construct new center data
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
        image, // Store Base64 image
        branchId,
        compId: companyId,
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

      // Create and save center
      const newCenter = new Center(newCenterData);
      await newCenter.save();
      await Branch.findByIdAndUpdate(branchId, {
        $push: { centers: newCenter._id }
      });

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

      const updates = { ...raw };

    if (req.file) {
  updates.image = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
}


      const newdata = autoParse(raw.newdata);
      delete updates.newdata;

      // Merge newdata fields
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

      if (updates.location && typeof updates.location === "string") {
        try {
          updates.location = JSON.parse(updates.location);
        } catch { }
      }

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
      await Branch.findByIdAndUpdate(branchId, {
        $pull: { centers: id }
      });

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
      const  branchId  = req.params.id;
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

};


export const requestAdminController = {
  // 1. Get All Requests
  getAllRequests: async (req, res) => {
    try {
      const requests = await Request.find();
      return res.json({
        success: true,
        requests
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },
  // 2. Delete Request By ID
  deleteRequestById: async (req, res) => {
    try {
      const { id } = req.params;

      const requestDoc = await Request.findById(id);
      if (!requestDoc) {
        return res.status(404).json({ success: false, message: "Request not found" });
      }

      await Request.findByIdAndDelete(id);
      return res.json({ success: true, message: "Request deleted successfully" });
    } catch (error) {
      console.error("Error deleting request:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // 3. Change Request State
  changeRequestState: async (req, res) => {
    try {
      const { id } = req.params; // request id
      const { state } = req.body; // 'agree', 'reverse', 'free'

      const requestDoc = await Request.findById(id);
      if (!requestDoc) {
        return res.status(404).json({ success: false, message: "Request not found" });
      }

      const { relatedId, relatedType } = requestDoc;

      if (relatedType === "Company") {
        await Company.findByIdAndUpdate(relatedId, { request: state });
        await Branch.updateMany({ compId: relatedId }, { request: state });
        await Center.updateMany({ compId: relatedId }, { request: state });
      } else if (relatedType === "Branch") {
        await Branch.findByIdAndUpdate(relatedId, { request: state });
        await Center.updateMany({ branchId: relatedId }, { request: state });
      } else if (relatedType === "Center") {
        await Center.findByIdAndUpdate(relatedId, { request: state });
      }

      return res.json({
        success: true,
        message: `Request state changed to '${state}' for ${relatedType}`,
      });
    } catch (error) {
      console.error("Error changing request state:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // 4. Get Requests By State (agree or reverse)
  getRequestsByState: async (req, res) => {
    try {
      const { state } = req.body; // 'agree' or 'reverse'

      if (!['agree', 'reverse'].includes(state)) {
        return res.status(400).json({
          success: false,
          message: "Invalid state. Allowed values: 'agree' or 'reverse'."
        });
      }

      const requests = await Request.find();
      const filteredRequests = [];

      for (const reqDoc of requests) {
        let relatedDoc = null;

        if (reqDoc.relatedType === "Company") {
          relatedDoc = await Company.findById(reqDoc.relatedId);
        } else if (reqDoc.relatedType === "Branch") {
          relatedDoc = await Branch.findById(reqDoc.relatedId);
        } else if (reqDoc.relatedType === "Center") {
          relatedDoc = await Center.findById(reqDoc.relatedId);
        }

        if (relatedDoc && relatedDoc.request === state) {
          filteredRequests.push(reqDoc);
        }
      }

      return res.json({
        success: true,
        state,
        requests: filteredRequests
      });

    } catch (error) {
      console.error("Error fetching requests by state:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // 5. Get Requests Free (state = free)
  getRequestsFree: async (req, res) => {
    try {
      const requests = await Request.find();
      const filteredRequests = [];

      for (const reqDoc of requests) {
        let relatedDoc = null;

        if (reqDoc.relatedType === "Company") {
          relatedDoc = await Company.findById(reqDoc.relatedId);
        } else if (reqDoc.relatedType === "Branch") {
          relatedDoc = await Branch.findById(reqDoc.relatedId);
        } else if (reqDoc.relatedType === "Center") {
          relatedDoc = await Center.findById(reqDoc.relatedId);
        }

        if (relatedDoc && relatedDoc.request === "free") {
          filteredRequests.push(reqDoc);
        }
      }

      return res.json({
        success: true,
        state: "free",
        requests: filteredRequests
      });

    } catch (error) {
      console.error("Error fetching free requests:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // 6. Get Request Details By ID
  getRequestDetailsById: async (req, res) => {
    try {
      const { id } = req.params;

      const requestDoc = await Request.findById(id);
      if (!requestDoc) {
        return res.status(404).json({ success: false, message: "Request not found" });
      }

      let relatedDoc = null;
      if (requestDoc.relatedType === "Company") {
        relatedDoc = await Company.findById(requestDoc.relatedId).populate("branches");
      } else if (requestDoc.relatedType === "Branch") {
        relatedDoc = await Branch.findById(requestDoc.relatedId).populate("centers");
      } else if (requestDoc.relatedType === "Center") {
        relatedDoc = await Center.findById(requestDoc.relatedId);
      }

      return res.json({
        success: true,
        request: requestDoc,
        relatedDocument: relatedDoc
      });

    } catch (error) {
      console.error("Error fetching request details:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  }
};
