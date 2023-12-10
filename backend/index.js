import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send('Hello');
});



mongoose.connect(mongoDBURL)
    .then(()=>{
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`);
        });
        console.log('App connected to database');
    })
    .catch((error) =>{
        console.log(error);
    });
