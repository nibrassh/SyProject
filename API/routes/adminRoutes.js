import express from "express";
import { verifyToken } from "../middleware/verfiToken.js";
import { upload } from "../middleware/multer.js";
import {
  companyController,
  branchController,
  centerController,
  requestAdminController
} from "../controllers/adminControler.js";

const adminRoute = express.Router();

// ------------------- Company Routes -------------------
adminRoute.post(
  "/add-company",
  upload.single("image"),
  companyController.createCompany
);

adminRoute.put(
  "/update-company/:id",
  verifyToken,
  upload.single("image"),
  companyController.updateCompany
);

adminRoute.delete(
  "/delete-company/:id",
  verifyToken,
  companyController.deleteCompany
);

adminRoute.get("/companies", companyController.getAllCompanies);
adminRoute.get("/company/:id", companyController.getCompanyById);

// ------------------- Branch Routes -------------------
adminRoute.post(
  "/add-branch/:id",
  verifyToken,
  upload.single("image"),
  branchController.createBranch
);

adminRoute.put(
  "/update-branch/:id",
  verifyToken,
  upload.single("image"),
  branchController.updateBranch
);

adminRoute.delete(
  "/delete-branch/:id",
  verifyToken,
  branchController.deleteBranch
);
adminRoute.get("/branches/:id", branchController.getAllBranches);
adminRoute.get("/branch/:id", branchController.getBranchById);

// ------------------- Center Routes -------------------
adminRoute.post(
  "/add-center/:id",
  verifyToken,
  upload.single("image"),
  centerController.createCenter
);

adminRoute.put( 
  "/update-center/:id",
  verifyToken,
  upload.single("image"),
  centerController.updateCenter
);

adminRoute.delete(
  "/delete-center/:id",
  verifyToken,
  centerController.deleteCenter
);
adminRoute.get("/center/:id", centerController.getCenterById);
adminRoute.get("/centers/:id", centerController.getCentersByBranchId);

// ------------------- Request Routes -------------------
adminRoute.get("/requests", verifyToken, requestAdminController.getAllRequests);
adminRoute.post(
  "/requests/state",
   verifyToken,
  requestAdminController.getRequestsByState
);
adminRoute.get(
  "/requests/free",
 verifyToken,
  requestAdminController.getRequestsFree
);
adminRoute.get(
  "/request/:id",
   verifyToken,
  requestAdminController.getRequestDetailsById
);
adminRoute.delete(
  "/request/:id",
  verifyToken,
  requestAdminController.deleteRequestById
);
adminRoute.put(
  "/request/:id/state",
  verifyToken,
   requestAdminController.changeRequestState
);

export default adminRoute;
