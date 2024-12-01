const express = require('express');
const Route = express.Router();
const toureControler = require('../controler/toureControler');
const authCOntroler = require('../controler/authControler');
const reviewRoutes = require('../routes/reviewRoutes');
const upload = require('../utils/upload');

// Route for handling reviews related to tours
Route.use('/:tourId/reviews', reviewRoutes);

// Route to get all tours and create a new tour
Route.route('/')
    .get(toureControler.getAllToure)
    .post(
        authCOntroler.protect, 
        authCOntroler.restrictTo('admin', 'lead-guide', 'organizer'),  // Added 'organizer' role
        upload,
        toureControler.createToure
    );

// Route to get, update, and delete a specific tour by ID
Route.route('/:id')
    .get(toureControler.getToure)
    .patch(
        authCOntroler.protect, 
        authCOntroler.restrictTo('admin', 'lead-guide', 'organizer'), // Added 'organizer' role
        toureControler.updateToure
    )
    .delete(
        authCOntroler.protect,
        authCOntroler.restrictTo('admin', 'lead-guide', 'organizer'), // Added 'organizer' role
        toureControler.deleteToure
    );

module.exports = Route;
