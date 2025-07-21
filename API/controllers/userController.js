import Request from "../models/Request.js";
import Branch from "../models/Branch.js";
import Center from "../models/Center.js";
import Company from "../models/Company.js";

export const requestController = {
 
  companyRequest: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const companyRequest = await Request.create({
        ...data,
        relatedId: id,
        relatedType: "Company",
      });

      await Company.findByIdAndUpdate(id, { request: "reverse" });
      await Branch.updateMany({ compId: id }, { request: "reverse" });
      await Center.updateMany({ compId: id }, { request: "reverse" });

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
    const { id } = req.params;
    const data = req.body;

    try {
      const branchRequest = await Request.create({
        ...data,
        relatedId: id,
        relatedType: "Branch",
      });

      await Branch.findByIdAndUpdate(id, { request: "reverse" });
      await Center.updateMany({ branchId: id }, { request: "reverse" });

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
    const { id } = req.params;
    const data = req.body;

    try {
      const centerRequest = await Request.create({
        ...data,
        relatedId: id,
        relatedType: "Center",
      });

      await Center.findByIdAndUpdate(id, { request: "reverse" });

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
