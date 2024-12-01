const authControler = require('../controler/authControler');
const userControler = require('../controler/userControler');
const multer = require('multer');
const express = require('express');
const Routes = express.Router();

// Set up multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage: storage });

// User authentication routes
Routes.post('/signup', upload.single('phote'), authControler.signup);
Routes.post('/login', authControler.login);
Routes.get('/logout', authControler.logout);
Routes.post('/forgetPassword', authControler.forgetPassword);
Routes.patch('/resetPassword/:token', authControler.resetPassword);

// Protect all routes after this middleware
Routes.use(authControler.protect);

// User-specific actions
Routes.patch('/updateMyPassword', authControler.updatePassword);
Routes.get('/me', userControler.getMe, userControler.getUser);
Routes.patch('/updateMe', userControler.updateMe);
Routes.delete('/deleteMe', userControler.deleteMe);

// Restrict admin and organizer routes
Routes.use(authControler.restrictTo('admin', 'organizer'));  // Added 'organizer' role

Routes.get('/', userControler.getAllUser).post(userControler.createUser);
Routes.get('/:id', userControler.getUser).patch(userControler.updateUser).delete(userControler.deleteUser);

module.exports = Routes;
