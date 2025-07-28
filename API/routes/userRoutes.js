import express from 'express';
import {requestController } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/request/company/:id', requestController.companyRequest);


userRoute.post('/request/branch/:id', requestController.branchRequest);


userRoute.post('/request/center/:id', requestController.centerRequest);

export default userRoute;
