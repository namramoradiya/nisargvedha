const express = require('express');
const reviewControler = require('../controler/reviewControler');
const authCOntroler = require('../controler/authControler');
const Route = express.Router({ mergeParams: true });

Route.use(authCOntroler.protect);

Route.route('/')
    .get(reviewControler.getAllReview)
    .post(authCOntroler.restrictTo('user', 'organizer'), reviewControler.createReview); // Added 'organizer'

Route.route('/:id')
    .get(reviewControler.getReview)
    .patch(authCOntroler.restrictTo('user', 'admin', 'organizer'), reviewControler.updateReview) // Added 'organizer'
    .delete(authCOntroler.restrictTo('user', 'admin', 'organizer'), reviewControler.deleteReview); // Added 'organizer'

module.exports = Route;
