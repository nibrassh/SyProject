import Request from "../models/requestModel.js"
import Branch from "../models/branchModel.js";
import Center from "../models/centerModel.js"
import Company from "../models/companyModel.js";

export const requestController = {
 
  companyRequest: async (req, res) => {
    const { companyId } = req.params;
    const data = req.body;

    try {
      const companyRequest = await Request.create({
        ...data,
        relatedId: companyId,
        relatedType: "Company",
      }); 

      await Company.findByIdAndUpdate(companyId, { request: "reverse" });
      await Branch.updateMany({ compId: companyId }, { request: "reverse" });
      await Center.updateMany({ compId: companyId }, { request: "reverse" });

      res.status(201).json({
        message: "Request created for company. Branches and centers updated.",
        request: companyRequest,
      });
    } catch (err) {
      console.error("Error in companyRequest:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  branchRequest: async (req, res) => {
    const { branchId } = req.params;
    const data = req.body;

    try {
      const branchRequest = await Request.create({
        ...data,
        relatedId: branchId,
        relatedType: "Branch",
      });

      await Branch.findByIdAndUpdate(branchId, { request: "reverse" });
      await Center.updateMany({  branchId }, { request: "reverse" });

      res.status(201).json({
        message: "Request created for branch. Centers updated.",
        request: branchRequest,
      });
    } catch (err) {
      console.error("Error in branchRequest:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Center Request
  centerRequest: async (req, res) => {
    const { centerId } = req.params;
    const data = req.body;

    try {
      const centerRequest = await Request.create({
        ...data,
        relatedId: centerId,
        relatedType: "Center",
      });

      await Center.findByIdAndUpdate(centerId, { request: "reverse" });

      res.status(201).json({
        message: "Request created for center.",
        request: centerRequest,
      });
    } catch (err) {
      console.error("Error in centerRequest:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};
