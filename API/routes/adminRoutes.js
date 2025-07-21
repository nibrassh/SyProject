import express from 'express';
import { verifyToken } from '../middleware/verfiToken.js';
import { upload } from '../middleware/multer.js';
import { companyController, branchController, centerController } from '../controllers/adminControler.js';

const adminRoute = express.Router();

// ------------------- Company Routes -------------------
adminRoute.post('/add-company', verifyToken, upload.single('image'), companyController.createCompany);
adminRoute.put('/update-company/:id', verifyToken, companyController.updateCompany);
adminRoute.delete('/delete-company/:id', verifyToken, companyController.deleteCompany);
adminRoute.get('/companies', verifyToken, companyController.getAllCompanies);
adminRoute.get('/company/:id', verifyToken, companyController.getCompanyById);

// ------------------- Branch Routes -------------------
adminRoute.post('/add-branch', verifyToken, upload.single('image'), branchController.createBranch);
adminRoute.put('/update-branch/:id', verifyToken, branchController.updateBranch);
adminRoute.delete('/delete-branch/:id', verifyToken, branchController.deleteBranch);
adminRoute.get('/branches', verifyToken, branchController.getAllBranches);
adminRoute.get('/branch/:id', verifyToken, branchController.getBranchById);

// ------------------- Center Routes -------------------
adminRoute.post('/add-center', verifyToken, centerController.createCenter);
adminRoute.put('/update-center/:id', verifyToken, centerController.updateCenter);
adminRoute.delete('/delete-center/:id', verifyToken, centerController.deleteCenter);
adminRoute.get('/center/:id', verifyToken, centerController.getCenterById);
adminRoute.get('/centers/:id', verifyToken, centerController.getCentersByBranchId);

export default adminRoute;
