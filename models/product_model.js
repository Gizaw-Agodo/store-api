const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
 name: {
    type: String,
    required: [true,"name must be provided"]
   },
 price:{
    type:Number,
    required:[true,'price must be provided']
 },
 feautured:{
    type:Boolean,
    default:false
 },

 rating:{
    type:Number,
    default:4.5
 },

 createdAt:{
    type:Date,
    default:Date.now()
 },

 company:{
    type:String,
    enum:{
        values:['amazon','samsung','microsoft','facebook'],
        message:'{VALUE} is not supported'
    }
 }
})


const Product = mongoose.model('Product',product_schema)
module.exports = Product