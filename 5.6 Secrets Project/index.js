import express from "express";
import axios from "axios";
import ejs from "ejs";


const app = express();
const port = 3000;
const url='https://secrets-api.appbrewery.com/random';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',async(req,res)=>{
    try {
        const randomSecret=await axios.get(url);
        const result = randomSecret.data; //这里是这么写
         // axios的文档中，`data` is the response that was provided by the server
         // data: {},
        //原本我写了const result = JSON.stringify(randomSecret.data);
        //但实际上stringify是把里面的js对象变成json格式
        console.log(randomSecret);
        res.render('index.ejs',{
            secret:result.secret,
            user:result.username
    });
    } catch (error) {
    }
    
})

app.listen(port,()=>{
    console.log(`successfully running on ${port}`)
})


// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
