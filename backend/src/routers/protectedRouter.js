const express = require("express");
const router = express.Router();

const customerPortalController = require("../controller/customerPortalController.js");
const authenticateToken = require('../middleware/authMiddleware.js');

router.post("/upload", authenticateToken,  upload.single('file'), customerPortalController.uploadArtworks);
router.get("/order/:order_id",authenticateToken,customerPortalController.getArtwork);
router.get("/download/:id",authenticateToken,customerPortalController.downloadArtwork);


router.get("/invoices",authenticateToken,customerPortalController.getInvoices);
router.get("/invoices/:id/download",authenticateToken,customerPortalController.getInvoices);
router.get("/pay",authenticateToken,customerPortalController.createPayment);


module.exports = router;