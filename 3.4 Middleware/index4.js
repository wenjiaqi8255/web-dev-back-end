import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import onCopy from "copy-to-clipboard";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

app.use(bodyParser.urlencoded({ extended: true }));//别忘了，import后要.use，不然不会使用！
app.use(bandNameGenerator);


app.get('/', (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
})

app.post('/submit', (req,res)=>{
  res.send(`<h1>Your band name is</h1><p>${bandName}</p>`);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function bandNameGenerator(req,res,next){//注意这里的写法，需要输入这三个
  //用bodyparser才能把东西扒下来，不能在这里直接指称html里的这些class或者element，会找不到（报错"$ not defined"）
  console.log(req.body);//这句话不是必要的，是为了调试用的。如果没有了只是会让网站所有者看不到内容而已
  bandName=req.body["street"]+req.body["pet"];
  next();
  // //收到的东西
  // var str=req.street;
  // var pet=req.pet;
  // //返回合起来的文字
  // var bandName=str+pet;
  // bandNameGenerator(bandName);
  // $("h1").text("Your band name is ");
  // $("form").style.display="none";
  // $("p").text(input);
  // $(".copy").attr(value, "click-to-copy").onCopy;
  // next();
}