// imports ======================================================================================

const mongoose = require("mongoose");

// Schema =======================================================================================

const listingSchema = new mongoose.Schema({
    streetAddress:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    size:{
        type: Number,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
)

// model creation =================================================================================

const Listing = mongoose.model("Listing", listingSchema);

// exports ========================================================================================

module.exports = Listing
