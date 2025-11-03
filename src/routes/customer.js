import express from 'express';
import { postCreateCustomer, postCreateArrCustomer, getAllCustomers, putUpdateCustomer, deleteACustomer, deleteArrCustomer } from '../controllers/customer.controller.js';
const routerCustomerAPI = express.Router();
// Routes
routerCustomerAPI.post('/customers', postCreateCustomer);
routerCustomerAPI.post('/customers-many', postCreateArrCustomer);
routerCustomerAPI.get('/customers', getAllCustomers);
routerCustomerAPI.put('/customers', putUpdateCustomer);
routerCustomerAPI.delete('/customers', deleteACustomer);
routerCustomerAPI.delete('/customers-many', deleteArrCustomer);

routerCustomerAPI.get('/info', (req, res) => {
    console.log("check query", req.query)
    return res.status(200).json({
        data: req.query
    })
});
routerCustomerAPI.get('/info/:name/:address', (req, res) => {
    console.log("check params", req.params)
    return res.status(200).json({
        data: req.params
    })
});


export default routerCustomerAPI;
