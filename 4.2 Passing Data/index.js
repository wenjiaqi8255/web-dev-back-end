import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var wordCount;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs')
});

app.post("/submit", (req, res) => {
  var userName=req.body["fName"]+req.body["lName"];
  wordCount=userName.length;
  console.log(wordCount);
  // $(".default").text(`Your name has ${wordCount} characters in total`); 
  //没有加jQuery不能用$
  res.render("index.ejs",{//这里需要加！需要再render一次，才能把变量的更新给到ejs
    wordCount:wordCount //这里需要加！左边的是ejs里的变量，右边的是js里的变量
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
