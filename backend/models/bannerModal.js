const mongoose = require("mongoose")

const bannerSchema = mongoose.Schema({
    banner1: {
        type: String,
        required: true
    },
    banner2: {
        type: String,
    },
    banner3: {
        type: String,
    },
    banner4: {
        type: String,
    },
    banner5: {
        type: String,
    }
}, {
    timestamps: true
})

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner 