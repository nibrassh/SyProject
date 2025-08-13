import express from "express";
import { verifyToken } from "../middleware/verfiToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { upload } from "../middleware/multer.js";
import {
  companyController,
  branchController,
  centerController,
  requestAdminController
} from "../controllers/adminControler.js";

const adminRoute = express.Router();



// ------------------- Company Routes -------------------

// Create company (protected)
adminRoute.post(
  "/companies",
  verifyToken,
  isAdmin,
  upload.single("image"),
  companyController.createCompany
);

// Update company (protected)
adminRoute.put(
  "/companies/:companyId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  companyController.updateCompany
);

// Delete company (protected)
adminRoute.delete(
  "/companies/:companyId",
  verifyToken,
  isAdmin,
  companyController.deleteCompany
);

// Get all companies (public)
adminRoute.get("/companies", companyController.getAllCompanies);

// Get single company by ID (public)
adminRoute.get("/companies/:companyId", companyController.getCompanyById);

// ------------------- Branch Routes -------------------

// Create branch under a company (protected)
adminRoute.post(
  "/companies/:companyId/branches",
  verifyToken,
  isAdmin,
  upload.single("image"),
  branchController.createBranch
);

// Update branch (protected)
adminRoute.put(
  "/branches/:branchId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  branchController.updateBranch
);

// Delete branch (protected)
adminRoute.delete(
  "/branches/:branchId",
  verifyToken,
  isAdmin,
  branchController.deleteBranch
);

// Get all branches for a company (public)
adminRoute.get(
  "/companies/:companyId/branches",
  branchController.getAllBranches
);

// Get single branch by ID (public)
adminRoute.get("/branches/:branchId", branchController.getBranchById);

// ------------------- Center Routes -------------------

// Create center under a branch (protected)
adminRoute.post(
  "/branches/:branchId/centers",
  verifyToken,
  isAdmin,
  upload.single("image"),
  centerController.createCenter
);

// Update center (protected)
adminRoute.put(
  "/centers/:centerId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  centerController.updateCenter
);

// Delete center (protected)
adminRoute.delete(
  "/centers/:centerId",
  verifyToken,
  isAdmin,
  centerController.deleteCenter
);

// Get single center by ID (public)
adminRoute.get("/centers/:centerId", centerController.getCenterById);

// Get all centers for a branch (public)
adminRoute.get(
  "/branches/:branchId/centers",
  centerController.getCentersByBranchId
);

// ------------------- Request Routes -------------------

// Get all requests (protected? or public? Adjust as needed)
adminRoute.get(
  "/requests",
  verifyToken,
  isAdmin,
  requestAdminController.getAllRequests
);

// Get requests filtered by state (protected)
adminRoute.post(
  "/requests/state",
  verifyToken,
  isAdmin,
  requestAdminController.getRequestsByState
);

// Get requests with "free" state (protected)
adminRoute.get(
  "/requests/free",
  verifyToken,
  isAdmin,
  requestAdminController.getRequestsFree
);

// Get request details by ID (protected)
adminRoute.get(
  "/requests/:requestId",
  verifyToken,
  isAdmin,
  requestAdminController.getRequestDetailsById
);

// Delete a request (protected)
adminRoute.delete(
  "/requests/:requestId",
  verifyToken,
  isAdmin,
  requestAdminController.deleteRequestById
);

// Change request state (protected)
adminRoute.put(
  "/requests/:requestId/state",
  verifyToken,
  isAdmin,
  requestAdminController.changeRequestState
);

export default adminRoute;
