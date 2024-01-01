const UserController = require('../../Controller/UserController');
const CounterController=require('../../Controller/CounterList');
const UserSchema = require('../../Schemas/UserSchemas');
const counterSchema=require('../../Schemas/CounterSchemas');
const universalFunction = require('../../Functions/universalFunction');
const validationFunction = require("../../Functions/validationFunction");
const Router = require("express").Router();


//User Register API
Router.route('/register').post(
   validationFunction.validateUser(UserSchema.UserRegisterSchema),
   UserController.registerUser
);

//User Login API
Router.route('/login').post(

    validationFunction.validateUser(UserSchema.UserLoginSchema),
    UserController.loginUser
);
// User Logout API
Router.route('/logout').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(UserSchema.logoutUserSchemas),
    UserController.UserLogout
);
 
// Get All User List
Router.route('/getAllUserList').post(
        UserController.getAllUserList
);
//Get One User Details
Router.route('/getOneUserDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(UserSchema.getOneUserSchemas),
    UserController.getOneUserDetails
);

//Update User Details
Router.route('/updateUserDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(UserSchema.updateUserSchemas),
    UserController.updateUserDetails
)
//Delete User Details
Router.route('/deleteUserDetails').post(
    universalFunction.authenticateUser,
    validationFunction.validateUser(UserSchema.deleteUserSchemas),
    UserController.deleteUser
)
//CounterList Data-------------------------------
Router.route('/getcounterList').get(
    universalFunction.authenticateUser,
    //validationFunction.validateUser(counterSchema.getCounterSchemas),
    CounterController.getCounterList,
   )
   Router.route('/savecounterList').post(
    universalFunction.authenticateUser,
   // validationFunction.validateUser(counterSchema.addCounterSchemas),
    CounterController.saveCounterData,
   )
   Router.route('/updatecounterList').post(
    universalFunction.authenticateUser,
    //validationFunction.validateUser(counterSchema.updateCounterSchemas),
    CounterController.updateCounterList,
   )
   Router.route('/deletecounterList').post(
    universalFunction.authenticateUser,
    //validationFunction.validateUser(counterSchema.deleteCounterSchemas),
    CounterController.deleteCounterList,
   )
   Router.route('/getDateWiseData').post(
    universalFunction.authenticateUser,
    //validationFunction.validateUser(counterSchema.updateCounterSchemas),
    CounterController.getDateWiseDetails
   )
   Router.route('/findOne/:date').post(
    universalFunction.authenticateUser,
    //validationFunctioeUser(counterSchema.updateCounterSchemas),
    CounterController.findOneCounterController
   )
exports.Router=Router;
















