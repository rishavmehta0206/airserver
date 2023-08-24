import Place from "../models/place.js";
import User from "../models/user.js";

export const createPlace = async (req, res) => {
  console.log("called");
  //   res.send(req.user.user_id);
  try {
    let { user_id } = req.user;
    let { first_name } = await User.findById(user_id);
    // console.log(req.body);
    // res.json(first_name);
    let place = await Place.create({
      ...req.body,
      createdby: user_id,
      name: first_name,
    });
    res.status(201).json(place);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    let places = await Place.find({});
    console.log(places);
    res.status(200).json(places);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getOnePlace = async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);
    res.status(200).json(place);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const editOne = async (req, res) => {
  try {
    let place = await Place.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(place);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  console.log(req.params.id);
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deletion successfull" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
