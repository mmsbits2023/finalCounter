const universalFunction = require('../Functions/universalFunction');
const CounterDetails=require('../Models/CounterList');

/*module.exports.getCounterList=async(request,response)=>{
    const counterList=await CounterDetails.find();
    response.send(counterList);
}*/

exports.getCounterList=async function (request,response,next){
    try{
       
       var CounterDetailsList=await CounterDetails.find();    
     
      // response.status(200).json({CounterDetailsList});
       if(CounterDetailsList.length === 0 ){
        return response.status(400).send({
            status:"FAILURE",
            message:" Data not  found"
        }); 
       }
       let responseData={
        status:"SUCCESS",
        message:"List of all Data",
        data:{
            CounterDetailsList:CounterDetailsList,
            count:CounterDetailsList.length,
        },
       };
       universalFunction.sendResponse(request,response,responseData,next);


    }catch(error){
        next(error);
    }
  };

/*module.exports.saveCounterData=async(request,response)=>{
    const {amount,date}=request.body;

    CounterDetails
    .create({ date,amount,})
    .then ((data)=>{
        console.log("Added Successfully...");
        console.log(data);
        response.send(data);
    })
}*/

module.exports.updateCounterList = async(request,response)=>{
    const {_id,amount}=request.body;
    CounterDetails
    .findByIdAndUpdate(_id,{amount})
    .then(()=>response.send("Updated Successfully..."))
    .catch((err)=>console.log(err))
}
module.exports.deleteCounterList = async (request,response)=>{
    const {_id}=request.body;
    CounterDetails
    .findByIdAndDelete(_id)
    .then(()=>response.send("Deleted Successfully..."))
    .catch((err)=>console.log(err));
}

exports.saveCounterData = (async (request, response, next) => {
    try {
        const currentDate1=new Date().toLocaleDateString();
        const currentTime1=new Date().toLocaleTimeString();
        const { 
            currentDate,
            currentTime,
            amount,
            } = request.body;
        
        const counterData = await CounterDetails.find({amount:amount}).countDocuments();
       /* if (UserData > 0) {
            return response.status(409).send({
                status: "FAILURE",
                message: " Already exist"
            })
        }
       */
        const counterDetailsCheck = new CounterDetails();
            counterDetailsCheck.amount= amount;
           counterDetailsCheck.currentDate=currentDate1;
           counterDetailsCheck.currentTime=currentTime1;
        console.log("CounterDetails", counterDetailsCheck);
       
        const counterdetails1 = counterDetailsCheck.save(async function (error, saveResult) {
            if (error) { throw new Error(error); }
              
            let responseData = {
                status: "SUCCESS",
                message: " Added successfully",
                data: []
                            
            }; universalFunction.sendResponse(request, response, responseData, next);
        });
        
     } catch (error) {
        console.log(error);
        next(error);
          }
});  

//get date wise data

exports.getDateWiseDetails = async function (request, response, next) {
    try{
       //const {currentDate}=request.body;
         console.log(request.params.key)
         let   data =await CounterDetails.find({
            "$or":[
                {
                    "amount":{$regex:request.params.key},
                },
                {
                    "currentDate":{$regex:request.params.key},
                }, {
                    "currentTime":{$regex:request.params.key},
                }
            ]
         })
         response.send(data);
     /* const CounterListDetails1= await CounterDetails.find({currentDate:currentDate});
           
        if (CounterListDetails1.length === 0)
       {
        return response.status(404).send({
            status:"FAILURE",
            message:" data not  found"
        }); 
        }
         //response.json(CounterListDetails1);

        console.log("List...data", CounterListDetails1);
       let responseData={
        status:"SUCCESS",
        message:"Get date wise details",
        data:CounterListDetails1
     }
     universalFunction.sendResponse(request,response,responseData,next);
*/
    }catch(error){
        next(error);
    }
  };


  var counterService=require('../Controller/CounterService');

  exports.findOneCounterController=async(request,response)=>{
    
    console.log(request.params.currentDate);
    var result=await counterService.findOneCounterDBService(request.params.currentDate);


    if(result){
        response.send({"status":true,"data":result});
    }else{
       response.send({"status":false,"data":"data not found"});
    }

  }
  //module.exports=[findOneCounterController];