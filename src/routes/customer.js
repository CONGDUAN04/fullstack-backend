import express from 'express';
import { postCreateCustomer, postCreateArrCustomer, getAllCustomers, putUpdateCustomer } from '../controllers/customer.controller.js';
const routerCustomerAPI = express.Router();
// Routes
routerCustomerAPI.post('/customers', postCreateCustomer);
routerCustomerAPI.post('/customers-many', postCreateArrCustomer);
routerCustomerAPI.get('/customers', getAllCustomers);
routerCustomerAPI.put('/customers', putUpdateCustomer);
export default routerCustomerAPI;
