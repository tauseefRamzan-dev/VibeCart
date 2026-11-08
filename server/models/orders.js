const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    uid:{
      type: String,
      required: true,
    },
    orderID:{
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Object,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        id: {
          type: String,
          ref: 'Product',
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      // address: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },  
    },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
isPaid: {
   type: Boolean,
   required: true, 
},
paidAt: {
  type: Date,
  default: null,
}
  },
  { 
    timestamps: true
  }
);

module.exports = mongoose.model('Orders', orderSchema);