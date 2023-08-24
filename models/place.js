import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String },
  createdby: { type: String },
  title: { type: String },
  // city: {
  //   type: String,
  //   required: true,
  // },
  address: { type: String },
  photos: { type: [String] },
  description: String,
  perks: [String],
  // checkIn: Number,
  // checkOut: Number,
  // maxGuests: Number,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [{}],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("Place", placeSchema);
export default User;
