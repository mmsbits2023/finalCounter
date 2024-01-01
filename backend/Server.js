require('./db/connection');
const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();
const Port = process.env.PORT || 5001;
const UserRouter = require('./Routes/UserRoutes/UserRoutes');
const CounterRouter=require('./Routes/UserRoutes/UserRoutes')



const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/user',UserRouter.Router);
app.use('/counter',CounterRouter.Router);





app.listen(Port, () => { 
    console.log(`Server is running on port number ${Port}`)
})