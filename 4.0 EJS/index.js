import express from "express";
import ejs from "ejs";

const port=3000;
const app=express();

var todayInDate;
var todo;
var todayWeekdayOrWeekend;


app.use(weekdayOrWeekend);

app.get('/',(req,res)=>{
    res.render('today.ejs',{
        todayWeekdayOrWeekend,//这里卡住了，要这么写
        todo
    });
})

app.listen(port,()=>{
    console.log(`listening to ${port}`);
})

function weekdayOrWeekend(req,res,next){
    var today = new Date();//这里，Date()括号里不写东西，就是今天
    //用"June 24, 2023 11:00:00"测过了ok
    var todayInDate=today.getDay();

    if(todayInDate===0||todayInDate===6){ //或 是两个||
        todayWeekdayOrWeekend="weekend"
        todo="have some fun";
    }
    else{
        todayWeekdayOrWeekend="weekday"
        todo="work hard";
    }
    next();
}

