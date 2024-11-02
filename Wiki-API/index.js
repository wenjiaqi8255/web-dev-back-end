import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose, { mongo } from "mongoose";

//配服务器
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
//   await mongoose.connect('mongodb+srv://admin-wenjiaqi:Test123@cluster0.k7haycd.mongodb.net/?retryWrites=true&w=majority/blogDB');

  console.log("success")
}

//数据类型
const articleSchema= new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    }
});

const Article= mongoose.model('Article', articleSchema);

//程序

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.route('/articles')
.get((req,res)=>{
    Article.find({})
    .then((articles)=>{
        res.send(articles); //这里是express里a的send功能!
        // console.log(articles);
    })
    .catch((err)=>{
        console.log(err);
    })
})
.post((req,res)=>{
    // console.log(req.body.title + req.body.content);
    const newArticle= new Article({
        title:req.body.title,
        content:req.body.content
    })
    newArticle.save()
    .then(()=>{
        res.redirect('/articles');
    })
    .catch((err)=>{
        console.log(err);
    })
})
.delete((req,res)=>{
    Article.deleteMany({})
    .then(()=>{
        console.log("successfully delete all articles")
        res.redirect('/articles');
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.route('/articles/:articleTitle')
.get((req,res)=>{
    Article.findOne({title:req.params.articleTitle})
    .then((foundArticle)=>{
        if (foundArticle === null) {
            console.log('Article not found.'); //区分找不到和err的情况
        } else {
            console.log(req.params.articleTitle)
            res.send(foundArticle);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})
.put((req,res)=>{
    Article.Updateone(
        {title:req.params.articleTitle},
        {title:req.body.title,
        content:req.body.content})
    .then(()=>{
        console.log("successfully update")
    })
    .catch((err)=>{
        console.log(err);
    })
})
.patch((req,res)=>{
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {$set:req.body}) //这个美元符号+set可以执行:之后的改变，加上req.body，有什么才会拿什么，才会换什么，很好用
    .then((foundArticle)=>{
        if(foundArticle===null){
            console.log('Article not found.'); //区分找不到和err的情况
        } else {
            res.send(foundArticle);
            console.log("successfully update");
        }
    })
    .catch((err)=>{
        console.log(err);
    })
        
})
.delete((req,res)=>{
    Article.findOneAndRemove(
        {title:req.params.articleTitle})
        .then(()=>{
            console.log("successfully delete the article")
        })
        .catch((err)=>{
            console.log(err);
        })
});


app.listen(port,()=>{
    console.log(`successfully running on port ${port}`);
})