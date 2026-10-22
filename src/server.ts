import express from "express";
import {config} from "dotenv";
let app = express();
config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

let port = process.env.PORT;
app.listen(port , () => {
    console.log(`Server Running on port ${port}`);
});



export default app;