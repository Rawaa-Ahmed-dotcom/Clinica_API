import express from "express";
import {config} from "dotenv";
let app = express();
config();
let port = process.env.PORT;
app.listen(port , () => {
    console.log(`Server Running on port ${port}`);
});



export default app;