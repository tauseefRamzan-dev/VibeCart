// const mongoose = require('mongoose');

// const wishlistSchema = new mongoose.Schema(
//   {
//     userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       unique: true 
//     },
//     products: [
//       {
//         productID: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true
//         }
//       }
//     ]
//   },
//   {
//     timestamps: true
//   }
// );

// const wishlist=mongoose.model('Wishlist', wishlistSchema);
// module.exports = wishlist;


const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true 
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;