//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var userIsAuthorised=false; //用了这个判断方法之后就可以了

app.use(bodyParser.urlencoded({ extended: true }));
function secretChecker(req,res,next) {
    const password=req.body["password"];//password在这里写
    if(password==="ILoveProgramming"){
        userIsAuthorised=true;
    }
    next();
    // res.sendFile(__dirname + "/public/secret.html");

    }
    // else{
    //     res.redirect('/'); //这么写会展示重定向过多
    // }
// }
app.use(secretChecker); 

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/check',function(req,res){
    if(userIsAuthorised){
    res.sendFile(__dirname + "/public/secret.html");}

    else{
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


