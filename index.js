import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
    res.send("<h1>Hello there</h1>")
})
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
