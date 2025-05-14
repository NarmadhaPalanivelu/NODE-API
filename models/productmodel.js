const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please enter the product name"]
        },
        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }

)
const Product = mongoose.model('Product', productSchema);
module.exports = Product;

