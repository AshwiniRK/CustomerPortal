const Artwork = require("../models/ArtWork");
const Invoice = require("../models/Invoice");

const uploadArtworks = async (req, res) => {
    try {
        const newArtwork = new Artwork({
          user_id: req.user.id,
          order_id: req.body.order_id,
          filename: req.file.filename,
          path: req.file.path
        });
        await newArtwork.save();
        res.json({ message: 'Artwork uploaded successfully', artwork: newArtwork });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading artwork', error });
      }
};
const getArtwork = async (req, res) => {
    try {
        const orderId= req.params.orderId;
        const artworks = await Artwork.find({ order_id: orderId });
        res.json(artworks);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching artworks', error });
      }
};
const downloadArtwork = async (req, res) => {
    try {
        const id= req.params.id;
        const artwork = await Artwork.findById(id);
        if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
        res.download(artwork.path);
      } catch (error) {
        res.status(500).json({ message: 'Error downloading artwork', error });
      }
};
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user_id: req.user.id, status: { $ne: "paid" } });
        res.json(invoices);
      } catch (error) {
        res.status(500).json({ message: 'Database error', error });
      }
};

const getInvoiceForDownload = async (req, res) => {
    try {
    const invoice = await Invoice.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.download(invoice.file_path);
    } catch (error) {
    res.status(500).json({ message: 'Database error', error });
    }
};
const createPayment = async (req, res) => {
    try {
    const { invoice_id, amount, method } = req.body;
    const updatedInvoice = await Invoice.findOneAndUpdate(
        { _id: invoice_id, user_id: req.user.id },
        { $set: { status: "paid", payment_method: method, paid_amount: amount } },
        { new: true }
    );
    if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Payment processed successfully', updatedInvoice });
    } catch (error) {
    res.status(500).json({ message: 'Database error', error });
    }
};


// const getArtworks = async (req, res) => {
//   try {
 
//     const Artworks = await Artwork.find({});
//     res.status(200).json({
//       success: true,
//       data: Artworks,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching Artworks",
//       error: error.message,
//     });
//   }
// };

// const createArtwork = async (req, res) => {
//   try {
//     const { name, isEnabled, subFeatures } = req.body;

//     // Check if Artwork with same name exists
//     const existingArtwork = await Artwork.findOne({ name });
//     if (existingArtwork) {
//       return res.status(400).json({
//         success: false,
//         message: "Artwork with this name already exists",
//       });
//     }

//     const Artwork = new Artwork({
//       name,
//       isEnabled,
//       subFeatures: subFeatures || [],
//     });

//     const savedArtwork = await Artwork.save();
//     res.status(201).json({
//       success: true,
//       data: savedArtwork,
//       message: "Artwork created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error creating Artwork",
//       error: error.message,
//     });
//   }
// };

// const updateArtwork = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     // Check if Artwork exists
//     const Artwork = await Artwork.findById(id);
//     if (!Artwork) {
//       return res.status(404).json({
//         success: false,
//         message: "Artwork not found",
//       });
//     }

//     // If updating name, check for duplicates
//     if (updateData.name && updateData.name !== Artwork.name) {
//       const existingArtwork = await Artwork.findOne({ name: updateData.name });
//       if (existingArtwork) {
//         return res.status(400).json({
//           success: false,
//           message: "Artwork with this name already exists",
//         });
//       }
//     }

//     const updatedArtwork = await Artwork.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       data: updatedArtwork,
//       message: "Artwork updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error updating Artwork",
//       error: error.message,
//     });
//   }
// };

// const deleteArtwork = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if Artwork exists
//     const Artwork = await Artwork.findById(id);
//     if (!Artwork) {
//       return res.status(404).json({
//         success: false,
//         message: "Artwork not found",
//       });
//     }

//     await Artwork.findByIdAndDelete(id);
//     res.status(200).json({
//       success: true,
//       message: "Artwork deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting Artwork",
//       error: error.message,
//     });
//   }
// };

module.exports  = {uploadArtworks, getArtwork, downloadArtwork,getInvoices, getInvoiceForDownload, createPayment};
