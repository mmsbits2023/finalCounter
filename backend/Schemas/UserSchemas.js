
exports.UserRegisterSchema={
    type:"object",
    properties:{
              mpin:{
            type:"string",
            minLength:6,
            maxLength:9,
            pattern:"^[0-9()-.s]+$",
           // pattern:"(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])^[0-9()-.s]+$"
      },
      email:{
        type:"string",

      }
    },
    required: ["email","mpin"]
};

exports.UserLoginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
                },
        mpin: {
            type: "string",
            minLength: 6,
            maxLength: 9,
           pattern: "^[0-9()-.s]+$"
            //pattern:"(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!])^[0-9()-.s]+$"
        }
    },
    required: ["email", "mpin"]
};

exports.getAllUserSchemas = {

  type: "object",
  properties: {
    mpin: {
      type: "string",
      minLength: 6,
      maxLength: 9,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["mpin"],
};

exports.getOneUserSchemas = {

  type: "object",
  properties: {
    mpin: {
      type: "string",
      minLength: 6,
      maxLength: 9,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["mpin"],
};

exports.updateUserSchemas = {

  type: "object",
  properties: {
    mpin: {
      type: "string",
      minLength: 6,
      maxLength: 9,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["mpin"],
};

exports.deleteUserSchemas = {

  type: "object",
  properties: {
    mpin: {
      type: "string",
      minLength: 6,
      maxLength: 9,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["mpin"],
};

exports.logoutUserSchemas = {

  type: "object",
  properties: {
    email:{
      type:"string"
    },
    mpin: {
      type: "string",
      minLength: 6,
      maxLength: 9,
      pattern: "^[0-9()-.s]+$",
    },
    
  },
  required: ["email","mpin"],
};
