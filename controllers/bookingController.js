import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

async function listBooking(req, res) {

    try {

        const {id} = await User.findById(req.auth.sub);

        const bookingList = await Booking.find({user: id}).populate("user").populate("experience");
        res.json(bookingList)
    } catch (error) {
        res.status(500).json("The Server had an error");
    }
}

async function findBooking(req, res) {
    try {

        const {id} = await User.findById(req.auth.sub);
        const foundBooking = await Booking.findById(req.params.id);

        if(id === foundBooking.user[0].toString()) {
            res.json(foundBooking);
        } else {
            res.json("This is not your booking, check again");
        }
        
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error)
    }
}

async function createBooking(req, res) {
    try {

        const {id} = await User.findById(req.auth.sub);
        const userId = req.body.user

        if (id === userId) {
        const newBooking = await Booking.create({
            name: req.body.name,
            place: req.body.place,
            price: req.body.price,
            user: req.body.user,
            experience: req.body.experience
        });
        res.json(newBooking);
    }
    } catch (error) {
        res.status(500).json("The server had an error");
    }
}

async function editBooking(req, res) {
    try {
        const {id} = await User.findById(req.auth.sub);
        const booking = await User.findByid(req.params.id);

        if (id === booking.user[0].toString()) {
            const foundBooking = await User.findById(req,params.id);

            foundBooking.name = req.body.name || req.body.name;
            foundBooking.place = req.body.place || req.body.place;
            foundBooking.price = req.body.price || req.body.price;

            await foundBooking.save();

            res.json(foundBooking);
        }
    } catch (error) {
        res.status(500).json("The server had an error");
    }
} 

async function deleteBooking(req, res) {
    try {
        const {id} = await User.findById(req.auth.sub)
        const booking = await Booking.findById(req.params.id);

        if (id === booking.user[0].toString()) {
            const deleteBooking = await Booking.findByIdAndDelete(req.params.id);
            res.json("The booking was deleted");
        }
    } catch(error) {
        res.status(500).json("The server had an error");
    }
}

export default {
    listBooking,
    findBooking,
    createBooking,
    editBooking,
    deleteBooking,
}