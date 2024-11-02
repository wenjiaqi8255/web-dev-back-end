import express from "express";

const app=express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}.`);
})

app.get("/",(req,res)=>{
    // res.send("<h1>Welcome</h1>");
    res.sendStatus(200);
});

app.post("/register",(req, res)=>{
    // res.send("<h1>About Me</h1>");
    res.sendStatus(200);
});