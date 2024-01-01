var CountserDetails=require('../Models/CounterList');


exports.findOneCounterDBService=(CountserData)=>{
    return new Promise(function myFn(resolve,reject){
CountserDetails.findOne({
    currentDate:CountserData},
    function returnData(error,result){
        if(error){
            reject(false);
            }
            else{
                resolve(result);
            }
    }
    )
    });
}