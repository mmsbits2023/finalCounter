const { Timestamp } = require('mongodb');
const mongoose=require('mongoose')


const counterSchema=new mongoose.Schema({
    amount:{
             type:String,
            require:true,

        },
        currentDate:{
        type:String
        },
        currentTime:{
            type:String
        },
        startDate:{
            type:String
        },
        endDate:{
            type:String
        }
   
    
})
module.exports=mongoose.model('CounterList',counterSchema);