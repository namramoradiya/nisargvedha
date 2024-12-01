const mongoose = require('mongoose')
const { trim } = require('validator')
const FeatureTourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'The Feature Tour must have name'],
        trim:true,
        unique:true,
        minlength:[10,'the 10 character are required'],
        maxlength:[40,'the 40 character are required'],
    },
    roome:{
        type:Number,
        required:[true,"The Feature Tour must have Roome"]
    },
    beds:{
        type:Number,
        required:[true,"The Feature Tour must have Beds"]
    },
    duration:{
        type:Number,
        required:[true, 'A Feature Toure Must Have Duration'],   
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'A Feature Toure Must Have MX Group Size'],   
    },
    price:{
        type:Number,
        required:[true , 'A toure Must Have Price ']
    },
    description:{
        type:String,
        trim: true 
    },
    imageCover:{
        type:String,
        required:[true , "image must be uploaded"]
    },
    images: [String],
})

const FeatureTour = mongoose.model('FeatureTour', FeatureTourSchema)

module.exports  = FeatureTour