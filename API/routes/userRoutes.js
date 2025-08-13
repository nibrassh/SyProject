import express from 'express';
import { requestController } from '../controllers/userController.js';

const userRoute = express.Router();


userRoute.post('/company/:companyId', requestController.companyRequest);
userRoute.post('/branch/:branchId', requestController.branchRequest);  
userRoute.post('/center/:centerId', requestController.centerRequest);
 
export default userRoute;
