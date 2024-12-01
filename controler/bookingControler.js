const Booking = require('../DBModel/bookingModel');
const Toure = require('../DBModel/toureModel');
const User = require('../DBModel/userModel');
const factory  = require('../controler/handelFactory')


exports.createBooking = factory.createOne(Booking)
exports.getAllBooking = factory.getAll(Booking)
exports.getBooking = factory.getOne(Booking)
exports.getUpdate = factory.updateOne(Booking)
exports.getDelete = factory.deleteOne(Booking)