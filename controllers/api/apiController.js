const Product = require('../../models/Product');
const Treveler = require('../../models/Booking');
const Category = require('../../models/Category');
const Bank = require('../../models/Bank');
const Booking = require('../../models/Booking');
const Member = require('../../models/Member');
const User = require('../../models/User');
const ShippingAddress = require('../../models/ShippingAddress');

module.exports = {
  getProducts: async (req, res) => {
    try {
      // const { limit } = req.params;
      const allProduct = await Product.find()
        .limit(500)
        .populate({ path: 'imageId', select: '_id imageUrl' })

      res.status(200).json({
        allProduct, 
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getProductDetails: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id })
        .populate({ path: 'featureId' })
        .populate({ path: 'imageId', select: '_id imageUrl' })
        .populate({ path: 'descriptionId' });

      res.status(200).json({
        ...product._doc,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  },
}

