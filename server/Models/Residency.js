// models/Residency.js
import mongoose from 'mongoose';

const residencySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    address: String,
    country: String,
    city: String,
    facilities: [String],
    image: String,

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});



export const Residency = mongoose.model('Residency', residencySchema);


