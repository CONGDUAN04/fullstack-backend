import express from 'express';
import { postCreateCustomer } from '../controllers/customer.controller.js';
const routerCustomerAPI = express.Router();
// Routes
routerCustomerAPI.post('/customers', postCreateCustomer);

export default routerCustomerAPI;
