import express from 'express';
import { postCreateCustomer, postCreateArrCustomer, getAllCustomers, putUpdateCustomer, deleteACustomer } from '../controllers/customer.controller.js';
const routerCustomerAPI = express.Router();
// Routes
routerCustomerAPI.post('/customers', postCreateCustomer);
routerCustomerAPI.post('/customers-many', postCreateArrCustomer);
routerCustomerAPI.get('/customers', getAllCustomers);
routerCustomerAPI.put('/customers', putUpdateCustomer);
routerCustomerAPI.delete('/customers', deleteACustomer);
export default routerCustomerAPI;
