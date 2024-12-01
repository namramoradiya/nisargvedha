const express = require('express')
const Routes = express.Router()
const ftControler = require('../controler/featuretoureControler')
const upload = require("../utils/upload")


//Feature Toure Routes Handler
Routes.route('/').get(ftControler.getAllFeatureToure)
.post(upload,ftControler.createFeatureToure)
Routes.route('/:id').get(ftControler.getOneFeatureToure)

module.exports = Routes