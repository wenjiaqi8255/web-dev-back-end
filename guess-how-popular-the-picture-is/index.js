import fetch from 'node-fetch';
global.fetch = fetch;

import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
// import $ from "jquery";
// import {JSDOM} from 'jsdom';
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );


import { createApi } from "unsplash-js";

// const api = createApi({
//   accessKey: "jvqNWAGoUdAfscfkTRQmYETRrArfHv4wzpPt183Mn18"
// });

// const api= {
//     params: {
//       count: 1,
//       apiKey: "jvqNWAGoUdAfscfkTRQmYETRrArfHv4wzpPt183Mn18",
//     }}

const api='jvqNWAGoUdAfscfkTRQmYETRrArfHv4wzpPt183Mn18'; //尼玛，格式不对一直没忘这里看
// const API_URL='https://api.unsplash.com/'

//----------读一个json
const JSON_URL = "/Users/wenjiaqi/Downloads/20230726-Backend Web Development/guess-how-popular-the-picture-is/public/onepicture.json";

import { readFile } from 'node:fs/promises';
var onepicture={};
try {
    const filePath = new URL(JSON_URL, import.meta.url);
    onepicture = await readFile(filePath, { encoding: 'utf8' });
    // console.log(onepicture);
  } catch (err) {
    console.error(err.message);
  }

//-----------
 
const app=express();
const port=3000;
// var result={
//     img:1,
//     realPopularity:2,
//     difference:3
// };
var unsplashPic;

// if(!unsplashPic){
//     document.querySelector('#guessForm').style.display="none";
// }

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/getOne',async(req,res)=>{
    // console.log(1)
    try {
        const getAUnsplashPic=await axios.get(`https://api.unsplash.com/photos/random/?client_id=${api}`);
        //上面是正式代码
        // const getAUnsplashPic= JSON.parse(onepicture);
        
        unsplashPic=getAUnsplashPic.data;
        //上面是正式代码
        // unsplashPic=getAUnsplashPic;
    // console.log(unsplashPic.downloads);


        // result={
        //     img:result.img+1,
        //     realPopularity:2,
        //     difference:3
        // };
        res.render('index.ejs',{img:unsplashPic.urls.small});

    } catch (error) {
        res.render('index.ejs',{error:error.data});

    }
})

app.post('/submit',(req,res)=>{
    const userGuess=req.body.downloads;
    // console.log(unsplashPic.downloads);

    var difference=userGuess-unsplashPic.downloads;

    // result.difference=4;
    // console.log(result.difference);


    res.render('index.ejs',{
        img:unsplashPic.urls.small,
        downloads:unsplashPic.downloads,
        userGuess:userGuess,
        difference:difference});
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})