const UserDetails = require("../Models/UserDetails");
const universalFunction = require('../Functions/universalFunction');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretyKey = "abcdefghijklmnopqrstuvwxyzabcdef";
const accountSid = 'AC546c895e89948f2f1b9cd6bbbb3887b6';
const authToken = '1af35f7350c83053c0e3f17677e7d1d9';
const twilioPhoneNumber = '+16076956331';

const client = require('twilio')(accountSid, authToken);

exports.registerUser = (async (request, response, next) => {
    try {
        
        const { 
            email,
            mpin,
            } = request.body;
        
        const UserData = await UserDetails.find({ email:email}).countDocuments();
        if (UserData > 0) {
            return response.status(409).send({
                status: "FAILURE",
                message: " Already exist"
            })
        }
       
        const UserDetailsCheck = new UserDetails();
        UserDetailsCheck.email = email;
        UserDetailsCheck.password= mpin;
       
        console.log("InvestorDetails", UserDetailsCheck);
       
        const Userdetails1 = UserDetailsCheck.save(async function (error, saveResult) {
            if (error) { throw new Error(error); }
              
            let responseData = {
                status: "SUCCESS",
                message: " Registered successfully",
                data: []
                            
            }; universalFunction.sendResponse(request, response, responseData, next);
        });
        
     } catch (error) {
        console.log(error);
        next(error);
          }
});          

exports.loginUser= async function (request, response, next) {
    try {
        const { email,mpin} = request.body;
        const UserData = await UserDetails.find({ email:email});

        if (UserData.length === 0) {
            return response.status(400).send({
                status: "FAILURE",
                message: " Invalid Data "
            })
        }
        
        if (!UserData[0].authenticate(mpin)) {
            let responseData = {
                status: "FAILURE",
                message: "Invalid Password",
                data: { verified: false }
            };
            universalFunction.sendResponse(request,response, responseData, next);
        } else {
            const salt = crypto.randomBytes(16).toString("hex");
            UserData[0].authToken = salt;

            UserData[0].save(async (error, result) => {
                if (error) {
                    throw new Error(error);
                }
                var jsonPayload = {
                    email: email,
                    mpin:mpin
                    
                };
                const jwtData = jwt.sign(jsonPayload, `${secretyKey}-${salt}`, {
                    expiresIn: "1d",
                });
                
               console.log("jwtData",jwtData)

                let responseData = {
                    status: "SUCCESS",
                    message: " Login successfully",
                    data: {
                        verified: "true",
                          email:email,
                        authToken: jwtData,
                    },
                };
                universalFunction.sendResponse(request, response, responseData, next);
           
            })
        }

    } catch (error) {
        next(error);
    }

};

exports.UserLogout = async (request, response, next) => {
    try {
        const { email,mpin } = request.body;
        
        const UserData = await UserDetails.find({email:email});
        
        if (UserData.length === 0) { 
            return response.status(404).send({
                status: "FAILURE",
                message:" Data not found here..."
            })
        }
        
        console.log("All details here....", UserData[0]);
        request.user = UserData[0];
        console.log("authToken of Investor is", request.user.authToken);
                
        const data = await UserDetails.updateOne({ email:email },{ $unset: { authToken: "" } })
        
        
        let responseData = {
            status: "SUCCESS",
            message: " Logout Successfully",
            data: []
        }
        universalFunction.sendResponse(request, response, responseData, next);
  
    } catch (error) {
        console.log(error);
        next(error);
    }
};

 exports.getAllUserList=async function (request,response,next){
    try{
       
       var UserDetailsList=await UserDetails.find();    
    
       if(UserDetailsList.length === 0 ){
        return response.status(400).send({
            status:"FAILURE",
            message:" Data not  found"
        }); 
       }
       let responseData={
        status:"SUCCESS",
        message:"List of all User",
        data:{
            UserDetailsList:UserDetailsList,
            count:UserDetailsList.length,
        },
       };
       universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
  };
 
exports.getOneUserDetails = async function (request, response, next) {
    try{
       const {email,mpin}=request.body;
            
      const UserDetails1= await UserDetails.find({email:email,mpin:mpin});
           
        if (UserDetails1.length === 0)
       {
        return response.status(404).send({
            status:"FAILURE",
            message:" data not  found"
        }); 
        }
        console.log("User...data", UserDetails1);
       let responseData={
        status:"SUCCESS",
        message:"Get one Userdetails",
        data:UserDetails1
     }
     universalFunction.sendResponse(request,response,responseData,next);

    }catch(error){
        next(error);
    }
  };

    exports.updateUserDetails=async function(request,response,next){
    try{
      const {
            email,
            mpin,                  
            } = request.body;
                              
       const UserDetails1=await UserDetails.findOne({email:email,mpin:mpin});
        console.log("UserDetails....",UserDetails);   

         if(UserDetails1.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Data not  found"
        }); 
      }
        UserDetails1.email =emailmail;
        UserDetails1.mpin = mpin;  

      const UserData= await UserDetails.save(function(error,saveResult){
        if(error){throw new Error (error)}
        let responseData={
            status:"SUCCESS",
            message:"All details updated successfully",
            data:UserDetails1
        }
        universalFunction.sendResponse(request,response,responseData,next);
    });
    }catch(error)
    {
        next(error);
    }
  }; 

  exports.deleteUser=async function(request,response,next){
    try{
      const {email,mpin}=request.body;
                
       const UserData=await InvestorDetails.deleteOne({email:email,mpin:mpin});
        console.log(UserData);   

         if(UserData.length === 0){
        return response.status(400).send({
            status:"FAILURE",
            message:" Data not  found"
        }); 
        }
         
        const UserData1 = await UserDetails();    
         
        UserData1.email = email;
        UserData1.mpin=mpin;

        let responseData = {
            status:"SUCCESS",
            message:"Delete User details successfully",
            data:[]
        }
        universalFunction.sendResponse(request,response,responseData,next);
  
    }catch(error)
    {
        next(error);
    }
  };

 