import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
//为什么这里构造函数不需要new？
//这是因为express()函数本身就是一个构造函数，返回一个应用实例。
//express()函数的内部实现使用了new关键字，但是它已经封装在函数内部，
//因此我们只需要直接调用express()函数，就会得到一个应用实例。


const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.post("/submit",(req,res)=>{
  console.log(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
