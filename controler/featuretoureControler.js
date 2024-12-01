const FeatureTour = require('../DBModel/FeatureTourModel')
const factory =  require('../controler/handelFactory')



//Create Feature Toure API Controler 
exports.createFeatureToure = factory.createOne(FeatureTour)
exports.getAllFeatureToure = factory.getAll(FeatureTour)
exports.getOneFeatureToure = factory.getOne(FeatureTour)
