import Room from "../models/room.js";
import Place from "../models/place.js";

export const getRooms = async (req, res) => {
  let { hotelId } = req.params;
  try {
    let hotel = await Place.findById(hotelId);
    res.status(200).json(hotel.rooms);
  } catch (error) {}
};

export const createRoom = async (req, res) => {
  try {
    let { hotelId } = req.params;
    console.log(req.body);
    let hotel = await Place.findById(hotelId);
    let room = await Room.create(req.body);
    hotel.rooms.push(room);
    let updatedHotel;
    try {
      updatedHotel = await Place.findByIdAndUpdate(
        req.params.hotelId,
        {
          $set: hotel,
        },
        { new: true }
      );
    } catch (error) {}
    res.status(200).json(updatedHotel);
  } catch (error) {}
};
export const deleteRoom = async (req, res) => {
  try {
    let { roomId, hotelId } = req.params;
    let hotel = await Place.findById(hotelId);
    // let room = await Room.findById(roomId);
    console.log(hotelId, roomId, hotel);
    hotel.rooms = hotel.rooms.filter((room) => room._id.toString() !== roomId);
    console.log(hotel.rooms.filter((room) => room._id.toString() !== roomId));
    let updatedHotel;
    try {
      updatedHotel = await Place.findByIdAndUpdate(
        req.params.hotelId,
        {
          $set: hotel,
        },
        { new: true }
      );
    } catch (error) {}
    res.status(200).json(updatedHotel);
  } catch (error) {}
};

export const bookRoom = async (req, res) => {
  let { singleRoomId, roomId, hotelId } = req.params;
  let { startDate, endDate } = req.body;
  let hotel = await Place.findById(hotelId);
  //   let room = hotel.rooms.filter((room) => room._id.toString() === roomId);
  let room = await Room.findById(roomId);
  //   console.log(room.roomNumbers);
  let singleRoom = room.roomNumbers.find(
    (r) => r._id.toString() === singleRoomId
  );
  singleRoom.startDate = startDate;
  singleRoom.endDate = endDate;
  let updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    {
      $set: room,
    },
    { new: true }
  );
  hotel.rooms = updatedRoom;
  let updatedPlace = await Place.findByIdAndUpdate(
    hotelId,
    {
      $set: hotel,
    },
    { new: true }
  );
  res.status(200).json(updatedPlace);
  try {
  } catch (error) {}
};
